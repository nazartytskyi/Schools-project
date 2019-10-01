import React, { Component } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './Carousel.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchools } from '../../../actions/getSchools';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
});

export class Carousel extends Component {

  render() {
    const schools = this.props.schools.data || [];

    return (
      <div className="news-card">
        <h1>Latest News</h1>
        <div className="news-slider">
        <Slider>
        {schools.map(school =>    
          school.news.map(item => (
            <div key={item.title} className="slider-card">
              <Card className='slider-item'>
                <CardHeader
                  title={item.title}
                  subheader={item.date}
                />
                <CardMedia
                  className="media"
                  image={item.img}
                  title={item.title}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card> 
              </div>
            ))      
          )}
        </Slider>
        </div>
     
      </div>
    )
  }
}

Carousel.propTypes = {
  schools: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carousel);
