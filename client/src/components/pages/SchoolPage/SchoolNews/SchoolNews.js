import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './SchoolNews.scss';
import RemoveNews from '../../../shared/RemoveNews/RemoveNews'

const SchoolNews = ({item,expanded,SchoolNewsId,handleExpandClick,currentSchool}) => (
  <Card className='school-news-card'>
    <CardHeader
      className='news-school-header'
      title={item.title}
      subheader={item.date}
    />
    <RemoveNews currentSchool={currentSchool} item={item}/>
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
        className={expanded.has(SchoolNewsId)
          ? 'expandOpen' : 'expand' }
        onClick={()=>{handleExpandClick(SchoolNewsId)}}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
    <Collapse in={expanded.has(SchoolNewsId) ? 
      true : 
      false} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>
          {item.description}
        </Typography>
      </CardContent>
    </Collapse> 
  </Card>
)
SchoolNews.propTypes = {
  item: PropTypes.object.isRequired,
  SchoolNewsId: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  handleExpandClick: PropTypes.func.isRequired,
}
export default SchoolNews;