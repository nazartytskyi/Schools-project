import React, { Component } from 'react';
import './News.scss'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';

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
                <NewsCard 
                  item={item} 
                  SchoolNewsId={SchoolNewsId} 
                  state={this.state} 
                  handleExpandClick={this.handleExpandClick}
                  schoolId = {school.id}
                />
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