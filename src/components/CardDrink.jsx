import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategoryDrinks, getDrinks, getDrinksByCategory } from '../helpers/fetchAPI';

class CardDrink extends Component {
  state = {
    objectDrinks: [],
    categories: [],
    toggleButton: false,
  };

  componentDidMount() {
    this.getObjectDrinks();
    this.getObjectCategories();
  }

  getObjectDrinks = async () => {
    const size = 12;
    const objectDrinks = await getDrinks();
    const twelveDrinks = objectDrinks.drinks.slice(0, size);
    this.setState({ objectDrinks: twelveDrinks });
  };

  getObjectCategories = async () => {
    const size = 5;
    const objectCategories = await getCategoryDrinks();
    const fiveCategories = objectCategories.drinks.slice(0, size);
    this.setState({ categories: fiveCategories });
  };

  buttonFilterByCategory = async (category) => {
    const { toggleButton } = this.state;

    if (toggleButton === false) {
      const size = 12;
      const objectDrinks = await getDrinksByCategory(category);
      const twelveDrinks = objectDrinks.drinks.slice(0, size);
      this.setState({ objectDrinks: twelveDrinks, toggleButton: true });
    } else {
      this.getObjectDrinks();
      this.setState({ toggleButton: false });
    }
  };

  detailsRedirck = () => {
    const { history, drink } = this.props;
    const number = 12;
    if (drink.length === 1) {
      const id = drink[0].idDrink;
      history.push(`/drinks/${id}`);
    }

    const card = drink.slice(0, number).map((e, index) => (
      <Link
        key={ e.strDrink + index }
        to={ `drinks/${e.idMeal}` }
      >
        <div>
          <h4 data-testid={ `${index}-card-name` }>{e.strDrink}</h4>
          <img
            src={ e.strDrinkThumb }
            alt={ e.strDrink }
            width="100px"
            height="100px"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-recipe-card` }>{e.strDrink}</p>
        </div>
      </Link>
    ));
    return card;
  };

  render() {
    const { objectDrinks, categories } = this.state;
    const { drink } = this.props;

    return (
      <div className="globalContainerDrinks" data-testid="card-drink">
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
            onClick={ () => this.getObjectDrinks() }
          >
            All
          </button>
        </div>
        <div className="cardContainer">
          { drink.length >= 1 ? this.detailsRedirck()
            : objectDrinks.map((e, index) => (
              <Link
                to={ `drinks/${e.idDrink}` }
                key={ e.idDrink }
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  key={ index }
                >
                  <p data-testid={ `${index}-card-name` }>
                    { e.strDrink }
                  </p>

                  <img
                    alt={ e.strDrink }
                    src={ e.strDrinkThumb }
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

CardDrink.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string }),
  }).isRequired,

  drink: PropTypes.arrayOf(PropTypes.shape()).isRequired,
});

const mapStateToProps = (stateGlobal) => ({
  drink: stateGlobal.typeRecipe.listDrink,
});

export default connect(mapStateToProps)(CardDrink);
