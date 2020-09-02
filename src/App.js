import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from './components/NewUser';
import EditUser from './components/EditUser';
import UsersTable from './components/UsersTable';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/main' component={UsersTable} />
        <Route exact path='/new_user' component={NewUser} />
        <Route exact path='/edit/:id' component={EditUser} />
      </Switch>
    </Router>
  );
}

export default App;
