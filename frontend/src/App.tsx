import React from 'react';
import classes from './App.module.scss'
import Toolbar from './Components/Nav/Toolbar/Toolbar.component';
import { Switch, Route } from 'react-router-dom';
import SignIn from './Components/Container/Auth/SignIn/SignIn.component';
import { ERoutesPath } from './Modals/Enums/Paths.enum';
import SignUp from './Components/Container/Auth/Signup/SignUp.component';


const App: React.FC = () => {

  return (
    <div className={classes.App}>
      <Toolbar></Toolbar>

      <div className={classes.AppHeader}>
        <Switch>
          <Route path={ERoutesPath.signIn.valueOf()} exact component={SignIn} />
          <Route path={ERoutesPath.signUp.valueOf()} exact component={SignUp} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
