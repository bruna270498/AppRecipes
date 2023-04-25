import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategoryMeals, getMeals, getMealsByCategory } from '../helpers/fetchAPI';

class CardMeal extends Component {
  state = {
    objectMeals: [],
    categories: [],
    toggleButton: false,
  };

  componentDidMount() {
    this.getObjectMeals();
    this.getObjectCategories();
  }

  getObjectMeals = async () => {
    const size = 12;
    const objectMeals = await getMeals();
    const twelveMeals = objectMeals.meals.slice(0, size);
    this.setState({ objectMeals: twelveMeals });
  };

  getObjectCategories = async () => {
    const size = 5;
    const objectCategories = await getCategoryMeals();
    const fiveCategories = objectCategories.meals.slice(0, size);
    this.setState({ categories: fiveCategories });
  };

  buttonFilterByCategory = async (category) => {
    const { toggleButton } = this.state;

    if (toggleButton === false) {
      const size = 12;
      const objectMeals = await getMealsByCategory(category);
      const twelveMeals = objectMeals.meals.slice(0, size);
      this.setState({ objectMeals: twelveMeals, toggleButton: true });
    } else {
      this.getObjectMeals();
      this.setState({ toggleButton: false });
    }
  };

  detailsRedirck = () => {
    const { history, meal } = this.props;
    const id = meal[0].idMeal;
    const number = 12;
    if (meal.length === 1) {
      history.push(`/meals/${id}`);
    }

    const card = meal.slice(0, number).map((e, index) => (
      <Link
        key={ e.strMeal + index }
        to={ `meals/${e.idMeal}` }
      >
        <div>
          <h4 data-testid={ `${index}-card-name` }>{e.strMeal}</h4>
          <img
            src={ e.strMealThumb }
            alt={ e.strMeal }
            width="100px"
            height="100px"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-recipe-card` }>{e.strTags}</p>
        </div>
      </Link>
    ));
    return card;
  };

  render() {
    const { objectMeals, categories } = this.state;
    const { meal } = this.props;

    return (
      <div className="globalContainerMeals" data-testid="card-meal">
        <div className="buttonContainer">
          { categories.map((e) => (
            <button
              key={ e.strCategory }
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => this.buttonFilterByCategory(e.strCategory) }
            >
              { e.strCategory }
            </button>
          )) }

          <button
            data-testid="All-category-filter"
            onClick={ () => this.getObjectMeals() }
          >
            All
          </button>
        </div>

        <div className="cardContainer">
          { meal.length >= 1 ? this.detailsRedirck()
            : objectMeals.map((e, index) => (
              <Link
                to={ `meals/${e.idMeal}` }
                key={ e.idMeal }
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  key={ index }
                >
                  <p data-testid={ `${index}-card-name` }>
                    { e.strMeal }
                  </p>

                  <img
                    alt={ e.strMeal }
                    src={ e.strMealThumb }
                    data-testid={ `${index}-card-img` }
                    className="cardImage"
                  />
                </div>
              </Link>
            )) }
        </div>

      </div>
    );
  }
}

CardMeal.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  meal: PropTypes.arrayOf(PropTypes.shape()).isRequired,
});

const mapStateToProps = (stateGlobal) => ({
  meal: stateGlobal.typeRecipe.listMeal,
});

export default connect(mapStateToProps)(CardMeal);
