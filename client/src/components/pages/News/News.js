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
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  schools: state.schools
});
class News extends Component {
  constructor(props) {
    super(props)
    this.state = {expanded: new Set()};
  }

  handleExpandClick = (SchoolNewsId) => {
    const { expanded } = this.state; 
    !expanded.has(SchoolNewsId) ? expanded.add(SchoolNewsId) : expanded.delete(SchoolNewsId);
    this.setState({expanded: expanded});
  }
  render() {
    const schools = this.props.schools.data || [];
      
  return (
    <div className='news-cards'>
      {schools.map((school, indexSchool) => {
        return <div key={school.name}>
          {school.news.map((item, indexNews) => {
            let SchoolNewsId = `${indexSchool}${indexNews}`;
            return <div key={item.name} >
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
                    className={ this.state.expanded.has(SchoolNewsId)
                      ? 'expandOpen' : 'expand' }
                    onClick={()=>{this.handleExpandClick(SchoolNewsId)}}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={ this.state.expanded.has(SchoolNewsId) ? 
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
          })}
        </div>
      })}
  </div>
  );
  }
}

News.propTypes = {
  schools: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(News);