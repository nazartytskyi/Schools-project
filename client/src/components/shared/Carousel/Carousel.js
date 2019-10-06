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
      <div className="news-card-slider">
        <h1>Latest News</h1>
        <div className="news-slider">
        <Slider 
          autoplay={2000}
        >
          {schools.map(school =>    
            school.news.map((item, index) => (
              <Card className='slider-item' key={index}>
                <Typography>
                <div className="slider-item-header">
                  <div className="slider-item-header-title">{item.title}</div>
                  <div className="slider-item-header-date">{item.date}</div>
                </div>
                </Typography>
                <CardMedia
                  className="slider-media"
                  image={item.img}
                  title={item.title}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p" className="slider-text">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card> 
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
