import React, { Component } from 'react';
import './VacancyList.scss';
import propTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


import Login from '../Login/Login';

export class VacancyList extends Component {
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
    return (
      <div className="list">
        {this.props.vacancies.map((vacancy, index) => {
          let SchoolNewsId = index;
    return <Card className="vacancy-card" key={index}>
            <div className="card-header">
              <CardHeader
                title={vacancy.title}
                subheader={vacancy.date}
              >
              </CardHeader>
              <div className="salary">
                <div><Typography>{vacancy.salary} грн</Typography></div>
                <div><Typography variant="body2" color="textSecondary">{vacancy.employment}</Typography></div>
              </div>
            </div>
            <CardContent className="card-content">
              <Link className="news-link" to={`/school/${vacancy.schoolId}`}>
              <Typography variant="body1" color="textPrimary">{vacancy.school}</Typography>
              </Link>
              <Typography variant="body2" color="textSecondary">вул: 
                                                                  {' '}{vacancy.adress.street} 
                                                                  {' '}{vacancy.adress.building}, 
                                                                  {' '}{vacancy.adress.district} район, м.
                                                                  {' '}{vacancy.adress.city}
              </Typography>
              <Typography variant="body1" color="textPrimary">тел: {vacancy.phoneNumber}</Typography>
              <div className="respond">
              <Login email={vacancy.email}/>  
              </div>       
            </CardContent>
            <CardActions disableSpacing className="card-footer">
              <IconButton
                className={ this.state.expanded.has(SchoolNewsId)
                  ? 'expandOpen' : 'expand' }
                onClick={() => this.handleExpandClick(SchoolNewsId)}
                aria-expanded = {this.state.expanded}
                aria-label = "show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={ this.state.expanded.has(SchoolNewsId) ? 
              true : 
              false} timeout="auto" unmountOnExit
            >
              <CardContent>
                <Typography paragraph>{vacancy.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        })}
      </div>
    )
  }
}
VacancyList.propTypes = {
  vacancies: propTypes.array.isRequired
};

export default VacancyList
