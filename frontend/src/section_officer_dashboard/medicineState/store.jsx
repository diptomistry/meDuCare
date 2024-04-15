// store.js
import { createStore } from 'redux';

// Define initial state
const initialState = {
  showAddMedicineForm: false,
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_MEDICINE_FORM':
      return {
        ...state,
        showAddMedicineForm: !state.showAddMedicineForm,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;
