import React from 'react';
import PropTypes from 'prop-types';
import CardFavoriteDrinks from './CardFavoriteDrinks';
import CardFavoriteMeals from './CardFavoriteMeals';
import Footer from './Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipes extends React.Component {
  state = {
    favoriteRecipes: [],
    favoriteDrinks: [],
    favoriteMeals: [],
    filter: '',
  };

  componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites() {
    this.setState({
      favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')),
    }, () => {
      const { favoriteRecipes } = this.state;
      this.setState({
        favoriteDrinks: favoriteRecipes.filter((recipe) => this.checkDrink(recipe)),
        favoriteMeals: favoriteRecipes.filter((recipe) => this.checkMeal(recipe)),
      });
    });
  }

  checkMeal({ type }) {
    return (type === 'meal');
  }

  checkDrink({ type }) {
    return (type === 'drink');
  }

  updateFilter(newFilter) {
    this.setState({ filter: newFilter });
  }

  removeFavoriteitem(item) {
    const oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = oldFavorites.filter((recipe) => recipe.id !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    this.updateFavorites();
  }

  render() {
    const { filter, favoriteRecipes, favoriteDrinks, favoriteMeals } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => this.updateFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => this.updateFilter('meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => this.updateFilter('drinks') }
        >
          Drinks
        </button>
        <div>
          {
            filter === ''
              && favoriteRecipes.map((recipe, index) => {
                if (recipe.type === 'drink') {
                  return (
                    <div key={ recipe.id }>
                      <CardFavoriteDrinks
                        recipe={ recipe }
                        index={ index }
                      />
                      <button
                        type="button"
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        onClick={ () => { this.removeFavoriteitem(recipe); } }
                      >
                        <img src={ blackHeartIcon } alt="desfavoritar" />
                      </button>
                    </div>
                  );
                }
                return (
                  <div key={ recipe.id }>
                    <CardFavoriteMeals
                      key={ recipe.id }
                      recipe={ recipe }
                      index={ index }
                    />
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      onClick={ () => { this.removeFavoriteitem(recipe); } }
                    >
                      <img src={ blackHeartIcon } alt="desfavoritar" />
                    </button>
                  </div>
                );
              })
          }
          {
            filter === 'drinks'
              && favoriteDrinks.map((recipe, index) => (
                <div key={ recipe.id }>
                  <CardFavoriteDrinks
                    recipe={ recipe }
                    index={ index }
                  />
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    onClick={ () => { this.removeFavoriteitem(recipe); } }
                  >
                    <img src={ blackHeartIcon } alt="desfavoritar" />
                  </button>
                </div>
              ))
          }
          {
            filter === 'meals'
              && favoriteMeals.map((recipe, index) => (
                <div key={ recipe.id }>
                  <CardFavoriteMeals
                    key={ recipe.id }
                    recipe={ recipe }
                    index={ index }
                  />
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    onClick={ () => { this.removeFavoriteitem(recipe); } }
                  >
                    <img src={ blackHeartIcon } alt="desfavoritar" />
                  </button>
                </div>
              ))
          }
        </div>
        <Footer />
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default FavoriteRecipes;
