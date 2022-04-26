import React, { Component } from 'react';
import {createStore} from 'redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {withRouter, Navigate} from 'react-router'
import Login from './screens/Base.js'
import Dashboard from './screens/Dashboard.js'
import Articoli from './screens/Articoli.js'
import Dipendenti from './screens/Dipendenti.js'
import Postazioni from './screens/Postazioni.js'
import Reparti from './screens/Reparti.js'
import NotFound from './screens/NotFound.js'
import Clienti from './screens/Clienti.js'


class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path='/clienti' element={<Clienti/>}/>
                    <Route exact path='/dashboard' element={<Dashboard/>}/>
                    <Route exact path='/articoli' element={<Articoli/>}/>
                    <Route exact path='/dipendenti' element={<Dipendenti/>}/>
                    <Route exact path='/postazioni' element={<Postazioni/>}/>
                    <Route exact path='/reparti' element={<Reparti/>}/>
                    <Route exact path='/' element={<Dashboard/>}/>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
      </div>
    );
  }

}
export default App

