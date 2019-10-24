import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const mapStateToProps = state => ({
  ...state
});
const columns = [
  { title: 'ПІБ', field: 'name' },
  { title: 'Дата народження', field: 'birthData', type: 'date' },
  { title: 'Статус',  field: 'status' },
  { title: 'Дата подання', field: 'dateApply',  type: 'date'},
  { title: 'Перша черга', field: 'firstPriority', type: 'boolean'},
  { title: 'Коментар', field: 'comment'}
]
class InfoTable extends Component {
  constructor(props) {
    super(props)
    this.state = {columns};
  }
  render() {
    const { currentSchool: { firstGrade: { requests } } } = this.props;
    const data = requests.map((request) => {
      return { 
        name: request.studentName,
        birthData: request.dateBirth,
        status: request.status,
        dateApply: request.dateApply,
        firstPriority: request.firstPriority,
        comment: request.comment || '-'
      }
    })
    
  
  return (
    <MaterialTable
      icons={tableIcons}
      title="Заявки"
      data={data}
      columns={this.state.columns}
      size='large'
    />
  );
  }
}
export default connect(mapStateToProps)(InfoTable);