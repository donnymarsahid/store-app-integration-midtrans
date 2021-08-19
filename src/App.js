import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './guest/components/Navbar';
import Login from './access/Login';
import Register from './access/Register';
import './App.css';
import Footer from './assets/components/Footer';
import Guest from './guest/Guest';
import { useEffect, useState } from 'react';
import dataCoffeeVariant from './data/coffeeVariant.json';
import { createContext } from 'react';
import Users from './users/Users';
import dataAccount from './data/account.json';

function App() {
  const dataAccountAuth = JSON.parse(localStorage.getItem('user_auth'));
  const loginAuth = JSON.parse(localStorage.getItem('login_auth'));

  const [coffeeVariant, setCoffeeVariant] = useState([]);
  const [account] = useState(dataAccountAuth);
  const [login] = useState(loginAuth);

  useEffect(() => {
    setCoffeeVariant(dataCoffeeVariant);
  }, [coffeeVariant, account]);

  if (!login) {
    localStorage.setItem('user_auth', JSON.stringify(dataAccount));
    localStorage.setItem('login_auth', false);
    return (
      <Router>
        <context.Provider value={{ coffeeVariant }}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Guest} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
          <Footer />
        </context.Provider>
      </Router>
    );
  }

  if (login) {
    return (
      <>
        <Router>
          <context.Provider value={{ coffeeVariant }}>
            <Switch>
              <Route path="/" exact component={Users} />
            </Switch>
          </context.Provider>
        </Router>
      </>
    );
  }
}

export const context = createContext();
export default App;
