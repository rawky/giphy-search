import React from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Giphy from './components/Giphy';
import Top from './components/Top';
import './App.css';
import logo from './logo.svg';


const App = () => {
   return(
      <Router>
        <div className="lg">
          <header className="App-header">
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link><h2 className="logo">Giphy</h2>
          </header>
          <nav className="b-topg">
            <ul>
              <li><Link to="/Top" >Top Gifs</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Giphy} />
            <Route path="/Top" component={Top} />
          </Switch>
          
        </div>
        
      </Router>
   )
};

export default App; 

