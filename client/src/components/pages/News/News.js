import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './News.scss'
import { connect } from 'react-redux';
import { getSchools } from '../../../actions/getSchools';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
});

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {expanded: new Set()};
  }
  getSchools = event => {
    // in this method we launch action
    this.props.getSchools();
  };
  
  componentDidMount() {
    //here we launch method getSchools from App
    this.getSchools();
  }

  handleExpandClick = (indexSchool, indexNews) => {
    const { expanded } = this.state; 
    let newObj = {[indexSchool]: indexNews};
    if(this.checkObject(newObj)) {
      expanded.forEach(item => JSON.stringify(item) === JSON.stringify(newObj) ? expanded.delete(item) : '');
      this.setState({expanded: expanded});
      return;
    }
    expanded.add(newObj);
    this.setState({expanded: expanded});
  }
  checkObject = (obj) => {
    for(let elem of this.state.expanded) { 
      if(JSON.stringify(elem) === JSON.stringify(obj)){
        return true; 
      }
    }
    return false;
  }
  render() {
    const schools = this.props.schools.data || [];  
  return (
    <div className='news-cards'>
      {schools.map((school, indexSchool) =>
        <div key={school.name}>
          {school.news.map((item, indexNews) => (
            <div key={item.name} >
              <Card className='card' key={item.name}>
                <CardHeader
                  title={item.title}
                  subheader={item.date}
                />
                <CardMedia
                  className='media'
                  image={item.img}
                  title={item.title}
                />
                <CardContent>
                  <Typography className='text-ellipsis' variant="body2" color="textSecondary" component="span">
                      {item.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    className={ this.checkObject({[indexSchool]: indexNews})
                      ? 'expandOpen' : 'expand' }
                    onClick={()=>{this.handleExpandClick(indexSchool, indexNews)}}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={ this.checkObject({[indexSchool]: indexNews}) ? 
                  true : 
                  false} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Collapse> 
              </Card>
            </div>
          ))}
        </div>
      )}
  </div>
  );
  }
}

News.propTypes = {
  schools: PropTypes.object.isRequired
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);