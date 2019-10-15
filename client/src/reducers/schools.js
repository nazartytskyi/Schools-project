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
      return {
        ...state,
        newItem: action.payload
      };
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
      console.log('reducer');
      return state;
    default:
      return state;
  }
};
