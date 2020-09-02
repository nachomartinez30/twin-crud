import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NuevoUsuario from './components/NuevoUsuario';
import Principal from './components/Principal';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/main' component={Principal} />
        <Route exact path='/new_user' component={NuevoUsuario} />
      </Switch>
    </Router>
  );
}

export default App;
