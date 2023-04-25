import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default class CardDoneDrinks extends Component {
  state = {
    message: false,
  };

  render() {
    const { recipe, index } = this.props;
    const { message } = this.state;
    return (
      <div>
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
              .replace('done-recipes', `drinks/${recipe.id}`));
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

CardDoneDrinks.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    doneDate: PropTypes.string,
  }),
}.isRequired;
