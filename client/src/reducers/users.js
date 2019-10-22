export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'GET_USER_ROLE':
      return {
        ...state,
        userRole: action.role,
        bindedSchool: action.bindedSchool
      };
    case 'SET_USER_ROLE':
      if (state.userFromMongo._id === action.uid) {
        state.userFromMongo.role = action.role;
        state.userFromMongo.bindedSchool = action.bindedSchool;
      }
      let userIndex = state.allUsers.findIndex(user => {
        return user.uid === action.uid;
      });
      state.allUsers[userIndex].role = action.role;
      state.allUsers[userIndex].bindedSchool = action.bindedSchool;
      return { ...state };
    case 'SET_USER_FROM_MONGO':
      return {
        ...state,
        userFromMongo: action.payload
      };
    case 'ADD_FAVORITE_SCHOOL':
      if (state.userFromMongo.choosedSchools.indexOf(action.payload) === -1) {
        state.userFromMongo.choosedSchools.push(action.payload);
      }
      return { ...state };
    case 'DELETE_FAVORITE_SCHOOL':
      let indexSchool = state.userFromMongo.choosedSchools.indexOf(
        action.payload
      );
      if (indexSchool !== -1) {
        state.userFromMongo.choosedSchools.splice(indexSchool, 1);
      }
      return { ...state };
    case 'GET_ALL_USERS':
      return {
        ...state,
        allUsers: action.allUsers
      };
    default:
      return state;
  }
};
