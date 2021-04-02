//this is the starting state of the app
const initialState = {};

//exported and imported into `src/redux/rootReducer.js`
export const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    //this would be imported from the exampleRedux.actions.js
    case 'ACTION_TYPE':
      //must return a new object
      return { ...state };
    default:
      //default returns the state as it is
      return state;
  }
};
