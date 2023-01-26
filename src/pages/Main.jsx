import React from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Recipes />
        <Footer />
      </div>
    );
  }
}

export default Main;
