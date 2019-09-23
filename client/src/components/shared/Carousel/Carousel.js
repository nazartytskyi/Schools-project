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
    const styles = {
      card: {
        maxWidth: 800,
        margin: 10
      }
    };

    return (
      <div className="cont">
        <h1>Latest News</h1>
         <Slider autoplay={2000}>
          {schools.map(school =>
            <div key={school.id}>
            {school.news.map(item => (
              <div key={item.title} className="item">
                <div className='news-cards'>
                  <Card className='card' style={styles.card}>
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
              </div>
            ))}
            </div>
          )}
         </Slider> 
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
