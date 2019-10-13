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
    case 'ADD_FAVORITE_SCHOOL':
      if (state.userFromMongo.choosedSchools.indexOf(action.payload) === -1) {
        state.userFromMongo.choosedSchools.push(action.payload);
      }
      return state;
    case 'DELETE_FAVORITE_SCHOOL':
      let indexSchool = state.userFromMongo.choosedSchools.indexOf(
        action.payload
      );
      if (indexSchool !== -1) {
        state.userFromMongo.choosedSchools.splice(indexSchool, 1);
      }
      return state;
    default:
      return state;
  }
};
