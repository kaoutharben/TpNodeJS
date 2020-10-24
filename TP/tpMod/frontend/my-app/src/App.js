import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from './SearchPage';
import LogIn from './LogIn';
import Upload from './Upload';
import Show from './Show';

function App() {
  return (
    <div className="app">
      <Router>  
        <Switch>  
          <Route path='/search'>
            <SearchPage/>
          </Route>
          <Route path='/logIn'>
            <LogIn/>
          </Route>
          <Route path='/show'>
              <Show/>
          </Route>
          <Route path='/upload'>
            <Upload/>
          </Route>
          <Route path='/'> 
            <Home/>
        </Route>
        </Switch> 
      </Router>

    </div>
  );
}

export default App;
