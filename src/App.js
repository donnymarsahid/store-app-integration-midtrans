import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './guest/components/Navbar';
import Login from './access/Login';
import Register from './access/Register';
import './App.css';
import Footer from './assets/components/Footer';
import Guest from './guest/Guest';
import { useEffect, useState } from 'react';
import dataCoffeeVariant from './data/coffeeVariant.json';
import dataAllCoffee from './data/allCoffee.json';
import { createContext } from 'react';
import Users from './users/Users';
import dataAccount from './data/account.json';
import AllMenu from './guest/AllMenu';
import Coffee from './guest/Coffee';

function App() {
  const dataAccountAuth = JSON.parse(localStorage.getItem('user_auth'));
  const loginAuth = JSON.parse(localStorage.getItem('login_auth'));

  const [coffeeVariant, setCoffeeVariant] = useState([]);
  const [allCoffee, setAllCoffee] = useState([]);
  const [account] = useState(dataAccountAuth);
  const [login] = useState(loginAuth);

  useEffect(() => {
    setCoffeeVariant(dataCoffeeVariant);
    setAllCoffee(dataAllCoffee);
  }, [coffeeVariant, account]);

  if (!login) {
    localStorage.setItem('user_auth', JSON.stringify(dataAccount));
    localStorage.setItem('login_auth', false);
    return (
      <Router>
        <context.Provider value={{ coffeeVariant, allCoffee }}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Guest} />
            <Route path="/all-menu" component={AllMenu} />
            <Route path="/coffee" component={Coffee} />
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
            <Footer />
          </context.Provider>
        </Router>
      </>
    );
  }
}

export const context = createContext();
export default App;
