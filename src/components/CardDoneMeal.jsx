import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default class CardDoneMeal extends Component {
  state = {
    message: false,
  };

  render() {
    const { recipe, index } = this.props;
    const { message } = this.state;
    return (
      <div>
        <Link
          to={ `meals/${recipe.id}` }
        >
          <div
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
            <img
              alt={ recipe.name }
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              className="cardImage"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.nationality} - ${recipe.category}` }
            </p>
            <div>
              Tags:
              {
                recipe.tags.length === 1 ? (
                  <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
                    { recipe.tags[0] }
                  </p>
                )
                  : (
                    <div>
                      <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
                        { recipe.tags[0] }
                      </p>
                      <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
                        { recipe.tags[1] }
                      </p>
                    </div>
                  )
              }
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Feito em
              {` ${recipe.doneDate}`}
            </p>
          </div>
        </Link>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          type="button"
          onClick={ () => {
            navigator.clipboard.writeText(window.location.href
              .replace('done-recipes', `meals/${recipe.id}`));
            this.setState({ message: true });
          } }
        >
          <img src={ shareIcon } alt="shareImg" />
        </button>
        {
          message && <p>Link copied!</p>
        }
      </div>
    );
  }
}

CardDoneMeal.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    date: PropTypes.string,
  }),
}.isRequired;
