import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/meals/:id"
          render={
            (props) => (<RecipeDetails { ...props } />)
          }
        />

        <Route
          exact
          path="/drinks/:id"
          render={
            (props) => (<RecipeDetails { ...props } />)
          }
        />

        <Route
          exact
          path="/drinks/:id/in-progress"
          render={
            (props) => (<RecipeInProgress { ...props } />)
          }
        />

        <Route
          exact
          path="/meals/:id/in-progress"
          render={
            (props) => (<RecipeInProgress { ...props } />)
          }
        />
      </Switch>
    </div>
  );
}
export default App;
