import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default class CardFavoriteDrinks extends Component {
  state = {
    message: false,
  };

  render() {
    const { recipe, index } = this.props;
    const { message } = this.state;
    return (
      <div className="doneRecipe">
        <Link
          to={ `drinks/${recipe.id}` }
        >
          <div
            data-testid={ `${index}-recipe-card` }
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
              {recipe.alcoholicOrNot}
            </p>
          </div>
        </Link>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          type="button"
          onClick={ () => {
            navigator.clipboard.writeText(window.location.href
              .replace('favorite-recipes', `drinks/${recipe.id}`));
            this.setState({ message: true });
          } }
          src={ shareIcon }
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

CardFavoriteDrinks.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
}.isRequired;
