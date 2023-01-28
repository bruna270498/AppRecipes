import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardDrink from '../components/CardDrink';
import CardMeal from '../components/CardMeal';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Recipes extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        { history.location.pathname === '/meals'
        && (
          <div>
            <CardMeal />
            <Header
              title="Meals"
              haveSearch
              history={ history }
            />
          </div>
        )}

        { history.location.pathname === '/drinks'
        && (
          <div>
            <CardDrink />
            <Header
              title="Drinks"
              haveSearch
              history={ history }
            />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(Recipes);
