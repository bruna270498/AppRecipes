import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getMealsByFirstLetter,
  getMealsByName,
  getMealsByIngredients,
  getDrinksByIngredients,
  getDrinksByName,
  getDrinksByFirstLetter } from '../helpers/fetchAPI';
import { addMeals, addDrinks } from '../redux/actions';

class SearchBar extends React.Component {
  state = {
    search: '',
    selected: '',

  };

  alert = () => {
    global.alert('Your search must have only 1 (one) character');
  };

  queryApiDrink = async () => {
    const { selected, search } = this.state;
    const { history, dispatch } = this.props;

    if (history.location.pathname === '/drinks') {
      if (selected === 'ingredient') {
        dispatch(addDrinks(await getDrinksByIngredients(search)));
      } if (selected === 'name') {
        dispatch(addDrinks(await getDrinksByName(search)));
      } if (selected === 'first-letter') {
        if (search.length > 1) {
          this.alert();
        }
        dispatch(addDrinks(await getDrinksByFirstLetter(search)));
      }
    }
  };

  queryApi = async () => {
    const { selected, search } = this.state;
    const { history, dispatch } = this.props;

    if (history.location.pathname === '/meals') {
      if (selected === 'ingredient') {
        dispatch(addMeals(await getMealsByIngredients(search)));
      } if (selected === 'name') {
        dispatch(addMeals(await getMealsByName(search)));
      } if (selected === 'first-letter') {
        if (search.length > 1) {
          this.alert();
        }
        dispatch(addMeals(await getMealsByFirstLetter(search)));
      }
    }
    this.queryApiDrink();
  };

  render() {
    const { search } = this.state;
    return (
      <div>
        <input
          data-testid="search-input"
          type="text"
          name="search"
          value={ search }
          placeholder="Search"
          onChange={ (e) => this.setState({ [e.target.name]: e.target.value }) }
        />
        <label htmlFor="ingredient-radio">

          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="radioSearch"
            value="ingredient"
            id="ingredient-radio"
            onChange={ (e) => this.setState({ selected: e.target.value }) }
          />
          Ingredient
        </label>
        <label htmlFor="name-radio">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="radioSearch"
            value="name"
            id="name-radio"
            onChange={ (e) => this.setState({ selected: e.target.value }) }
          />
          Name
        </label>
        <label htmlFor="first-letter-radio">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="radioSearch"
            value="first-letter"
            id="first-letter-radio"
            onChange={ (e) => this.setState({ selected: e.target.value }) }
          />
          First letter
        </label>

        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ this.queryApi }

        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SearchBar);
