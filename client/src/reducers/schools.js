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
      if(school._id === action.id) {
        school.news.unshift(action.payload)
      }
    });
      return {
        ...state,
        data: state.data
      };
    default:
      return state;
  }
};
