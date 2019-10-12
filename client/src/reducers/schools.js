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
    default:
      return state;
  }
};
