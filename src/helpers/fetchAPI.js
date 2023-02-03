const alert = 'Sorry, we haven\'t found any recipes for these filters.';

export const getDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const getMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const getCategoryDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

export const getCategoryMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

export const getMealsByCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data;
};

export const getDrinksByCategory = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data;
};

export const getMealsByIngredients = async (ingredients) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await response.json();
  const apiInicial = await getMeals();
  if (!data.meals) {
    global.alert(alert);
    return apiInicial;
  }

  return data.meals;
};

export const getMealByID = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};
export const getDrinkByID = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

export const getMealsByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  const apiInicial = await getMeals();
  if (!data.meals) {
    global.alert(alert);
    return apiInicial;
  }

  return data.meals;
};
export const getMealsByFirstLetter = async (FirstLetter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
  const data = await response.json();
  const apiInicial = await getMeals();
  if (!data.meals) {
    global.alert(alert);
    return apiInicial;
  }

  return data.meals;
};

export const getDrinksByIngredients = async (ingredients) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await response.json();
  const apiInicial = await getDrinks();
  if (!data.drinks) {
    global.alert(alert);
    return apiInicial;
  }
  return data.drinks;
};

export const getDrinksByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  const apiInicial = await getDrinks();
  if (!data.drinks) {
    global.alert(alert);
    return apiInicial;
  }
  return data.drinks;
};

export const getDrinksByFirstLetter = async (FirstLetter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
  const data = await response.json();
  const apiInicial = await getDrinks();
  if (!data.drinks) {
    global.alert(alert);
    return apiInicial;
  }
  return data.drinks;
};
