import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';         
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import {Redirect} from 'react-router';
import {GoogleApiWrapper} from 'google-maps-react';
import './ListSearch.scss'


function createData(id, name, zno, vacant, rate, distance) {
  
  return { id, name, zno, vacant, rate, distance};
}

let rows = [];

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Назва' },
  { id: 'zno', numeric: true, disablePadding: false, label: 'ЗНО' },
  { id: 'vacant', numeric: true, disablePadding: false, label: 'Вільні місця' },
  { id: 'rate', numeric: true, disablePadding: false, label: 'Відгуки' },
  { id: 'distance', numeric: true, disablePadding: false, label: 'Віддаленість' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 10,
    width: 1
  }
}));

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBHomne1KPE5WDiE8kzxEt9p2Ue5xM1Fkg'
})(ListSearch)

function useForceUpdate(){
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}
let lastUserCoordinates = {};
const distances = {};

function ListSearch(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [hasChanged, change] = React.useState(false);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
 // const [distances, setDistance] = React.useState({});
  const distanceMatrixService = new props.google.maps.DistanceMatrixService();

  function calculateDistance(userCoords, schoolCoords, id) {
    if (!userCoords.lat) {
      return '-';
    }
    const origin = new props.google.maps.LatLng(userCoords.lat, userCoords.lng);
    const destination = new props.google.maps.LatLng(schoolCoords.lat, schoolCoords.lng);

    distanceMatrixService.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING'
    }, callback);

    function callback(response, status) {
      if (status == 'OK') {
        const origin = response.originAddresses[0];
        const destination = response.destinationAddresses[0];
        //setDistance({...distances, [id]: response.rows[0].elements[0].distance.text});
        distances[id] = response.rows[0].elements[0].distance.text;
        
        //console.log(this)
      }
    } 

  }

  // const getDistance = async (start, end) => {
    
  //   const origin = new props.google.maps.LatLng(start.lat, start.lng);
  //   const final = new props.google.maps.LatLng(end.lat, end.lng);
  //   const service = new props.google.maps.DistanceMatrixService();
  //   const result = await getDistanceMatrix(
  //     service,
  //     {
  //       origins: [origin],
  //       destinations: [final],
  //       travelMode: 'DRIVING'
  //     }
  //   )
  //   //console.log(result.rows[0].elements[0].distance.text);
  //   return result;
  // }
    

  //     const getDistanceMatrix = (service, data) => new Promise((resolve, reject) => {
  //       service.getDistanceMatrix(data, (response, status) => {
  //         if(status === 'OK') {
  //           resolve(response)
  //         } else {
  //           reject(response);
  //         }
  //       })
  //     })
    
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  const [redirectElement, redirect] = React.useState('');

  function handleClick(event, id) {
    //providing route to school page by its id in database
    redirect(<Redirect push to={'/school/' + id}/>);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }


  function getAvgFeedbackRate(school) {
    let rateSum = 0;
    school.feedbacks.forEach(feedback => {
      rateSum += feedback.rate;
    })
    
    return Math.round(10 * rateSum / school.feedbacks.length) / 10;
  }
  
  
  if(props.schools) {
    rows = [];
    const schools = [...props.schools];

    if(props.userCoordinates.hasOwnProperty('lat') && lastUserCoordinates.lat !== props.userCoordinates.lat && lastUserCoordinates.lng !== props.userCoordinates.lng){
      schools.forEach(school => {
        calculateDistance(props.userCoordinates, school.coordinates, school.id);
      });

      lastUserCoordinates.lat = props.userCoordinates.lat;
      lastUserCoordinates.lng = props.userCoordinates.lng;
      //change(!hasChanged);
    }
    
    schools.forEach((school, index) => { 
      if(props.userCoordinates.hasOwnProperty('lat')){    
        rows.push( createData(school.id, school.name, school.avgZno, school.firstGrade.free, getAvgFeedbackRate(school), distances[school.id]) || '-');
      } else {
        rows.push( createData(school.id, school.name, school.avgZno, school.firstGrade.free, getAvgFeedbackRate(school), '-'));
      }
    });

  }

  const isSelected = name => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root + ' list-wrapper'}>
      {redirectElement}
      <Paper className={classes.paper}>   
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>                       
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                     <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.zno}</TableCell>
                      <TableCell align="right">{row.vacant || '-'}</TableCell>
                      <TableCell align="right">{row.rate}</TableCell>
                      <TableCell align="right">{row.distance}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}