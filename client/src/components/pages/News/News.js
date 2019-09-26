import React, { Component } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
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
    this.state = {expanded:false};
  }
  getSchools = event => {
    // in this method we launch action
    this.props.getSchools();
  };
  
  componentDidMount() {
    //here we launch method getSchools from App
    this.getSchools();
  }
  handleExpandClick = () => {
    this.setState({expanded:!this.state.expanded});
  }
  render() {
    const schools = this.props.schools.data || [];
    const styles = {
      card: {
        maxWidth: 768,
        margin: 10,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
    };
  return (
    <div className='news-cards'>
      {schools.map(school =>
        <div key={school.name}>
          {school.news.map(item => (
            <div key={item.name}>
      <Card className='card' style={styles.card} key={item.name}>
        <CardHeader
          title={item.title}
          subheader={item.date}
        />
        <CardMedia
          className='media'
          styles={styles.media}
          image={item.img}
          title={item.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(styles.expand, {
              [styles.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {item.description}
            </Typography>
            <Typography paragraph>
              1 paragraph
            </Typography>
            <Typography paragraph>
              2 paragraph
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
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
  schools: PropTypes.array.isRequired
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);