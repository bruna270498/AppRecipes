import { ADD_TYPE, ADD_MEALS, ADD_DRINKS } from '../actions';

const INITIAL_STATE = {
  typeRecipe: '',
  listMeal: [],
  listDrink: [],
};

const typeRecipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TYPE:
    return {
      ...state,
      typeRecipe: action.payload.typeRecipe,
    };
  case ADD_MEALS:
    return {
      listMeal: action.payload,
    };
  case ADD_DRINKS:
    return {
      listDrink: action.payload,
    };
  default: return state;
  }
};

export default typeRecipe;
