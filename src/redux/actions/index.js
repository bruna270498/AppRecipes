// Action Types

export const ADD_USER = 'ADD_USER';
export const ADD_TYPE = 'ADD_TYPE';
export const ADD_MEALS = 'ADD_MEALS';
export const ADD_DRINKS = 'ADD_DRINKS';

// Action Creator

export const addUser = (email, password) => ({
  type: ADD_USER,
  payload: {
    email,
    password,
  },
});

export const addType = (typeRecipe) => ({
  type: ADD_TYPE,
  payload: {
    typeRecipe,
  },
});

export const addMeals = (meal) => ({
  type: ADD_MEALS,
  payload: meal,
});

export const addDrinks = (drink) => ({
  type: ADD_DRINKS,
  payload: drink,
});
