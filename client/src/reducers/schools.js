export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_SCHOOLS_ACTION':
      return {
        ...state,
        data: action.payload
      };
    case 'GET_SCHOOLS_EVENTS_ACTION':
      return {
        ...state,
        events: action.payload
      };
    case 'ADD_NEWS':
      state.data.forEach(school => {
        if (school._id === action.schoolId) {
          school.news.unshift(action.payload);
        }
      });
      return state;
    case 'REMOVE_NEWS':
      let indexSchool = state.data.findIndex(school => {
        return school._id === action.idSchool;
      });
      let indexNews = state.data[indexSchool].news.findIndex(news => {
        return news._id === action.idNews;
      });
      console.log(action.idNews);
      state.data[indexSchool].news.splice(indexNews, 1);

      return {
        ...state,
        data: state.data
      };
    case 'ADD_REQUEST':
      let schoolIndexToAddRequest = state.data.findIndex(school => {
        return school._id === action.schoolId;
      });
      state.data[schoolIndexToAddRequest].firstGrade.requests.push(
        action.payload
      );
      return state;
    case 'UPDATE_REQUEST':
      let schoolIndex = state.data.findIndex(school => {
        return school._id === action.schoolId;
      });
      let requestIndex = state.data[schoolIndex].firstGrade.requests.findIndex(
        request => {
          return request._id === action.requestToUpdate._id;
        }
      );
      state.data[schoolIndex].firstGrade.requests[requestIndex] =
        action.requestToUpdate;
      return state;
    default:
      return state;
  }
};
