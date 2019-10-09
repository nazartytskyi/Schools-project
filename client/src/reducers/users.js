export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'SET_USER_ROLE':
    return {
      ...state,
      userRole: action.payload
    };
    case 'SET_USER_FROM_MONGO':
    return {
      ...state,
      userFromMongo: action.payload
    };
    default:
      return state;
  }
};
