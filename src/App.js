import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './pages/guest/components/Navbar';
import NavbarUsers from './pages/users/components/Navbar';
import './App.css';
import Footer from './assets/components/Footer';
import Guest from './pages/guest/Guest';
import { useEffect, useState } from 'react';
import dataCoffeeVariant from './data/coffeeVariant.json';
import dataAllCoffee from './data/allCoffee.json';
import { createContext } from 'react';
import Users from './pages/users/Users';
import dataAccount from './data/account.json';
import dataToppings from './data/toppings.json';
import dataTransaction from './data/transaction.json';
import AllMenu from './pages/guest/AllMenu';
import AllMenuUsers from './pages/users/AllMenu';
import BestSellerUsers from './pages/users/BestSeller';
import ScrollToTop from './assets/components/ScrollToTop';
import DetailPage from './pages/users/DetailPage';
import CartPage from './pages/users/CartPage';
import Profile from './pages/users/Profile';
import AddProduct from './pages/admin/AddProduct';
import AddTopping from './pages/admin/AddTopping';
import IncomeTransaction from './pages/admin/IncomeTransaction';
import Admin from './pages/admin/Admin';
import dataAdmin from './data/admin.json';
import NavbarAdmin from './pages/admin/components/NavbarAdmin';
import { v4 as uuidv4 } from 'uuid';
import NoMatch from './404/NoMatch';
import Store from './pages/guest/Store';
import BestSeller from './pages/guest/BestSeller';

function App() {
  const loginAuth = JSON.parse(localStorage.getItem('login_auth'));
  const [login] = useState(loginAuth);
  const [coffeeVariant, setCoffeeVariant] = useState(dataCoffeeVariant);
  const [allCoffee, setAllCoffee] = useState(dataAllCoffee);
  const [toppings, setToppings] = useState(dataToppings);
  const [transaction, setTransaction] = useState(dataTransaction);
  const [account, setAccount] = useState(dataAccount);

  useEffect(() => {
    setAccount(JSON.parse(localStorage.getItem('user_auth')));
    setAllCoffee(JSON.parse(localStorage.getItem('all_coffee')));
    setToppings(JSON.parse(localStorage.getItem('toppings')));
    setTransaction(JSON.parse(localStorage.getItem('user_transaction')));
  }, []);

  useEffect(() => {
    localStorage.setItem('user_auth', JSON.stringify(account));
    localStorage.setItem('all_coffee', JSON.stringify(allCoffee));
    localStorage.setItem('coffee_variant', JSON.stringify(coffeeVariant));
    localStorage.setItem('toppings', JSON.stringify(toppings));
    localStorage.setItem('user_transaction', JSON.stringify(transaction));
  });

  const addAccount = (fullname, email, password) => {
    setAccount([...account, { id: uuidv4(), fullname, email, password }]);
  };

  const addCoffee = (name, price, image) => {
    setAllCoffee([...allCoffee, { id: uuidv4(), name, price, image }]);
  };

  const addToppings = (name, price, image) => {
    setToppings([...toppings, { id: uuidv4(), name, price, image }]);
  };

  const addUserTransaction = (name, address, postcode, income) => {
    setTransaction([...transaction, { id: uuidv4(), name, address, postcode, income, status: 'waiting approve', action: '' }]);
  };

  if (!login) {
    localStorage.setItem('login_auth', false);
    localStorage.setItem('admin_auth', JSON.stringify(dataAdmin));
    return (
      <Router>
        <context.Provider value={{ coffeeVariant, allCoffee, addAccount }}>
          <ScrollToTop />
          <Navbar />
          <Switch>
            <Route path="/" exact component={Guest} />
            <Route path="/all-menu" component={AllMenu} />
            <Route path="/best-seller" component={BestSeller} />
            <Route path="/store" component={Store} />
            <Route path="/*" component={NoMatch} />
          </Switch>
          <Footer />
        </context.Provider>
      </Router>
    );
  }

  if (login && login !== 'admin') {
    return (
      <>
        <Router>
          <context.Provider value={{ coffeeVariant, allCoffee, addUserTransaction }}>
            <ScrollToTop />
            <NavbarUsers />
            <Switch>
              <Route path="/" exact component={Users} />
              <Route path="/all-menu" component={AllMenuUsers} />
              <Route path="/best-seller" component={BestSellerUsers} />
              <Route path="/detail-page/:id" component={DetailPage} />
              <Route path="/cart-page" component={CartPage} />
              <Route path="/profile" component={Profile} />
              <Route path="/store" component={Store} />
              <Route path="/*" component={NoMatch} />
            </Switch>
            <Footer />
          </context.Provider>
        </Router>
      </>
    );
  }

  if (login === 'admin') {
    return (
      <Router>
        <context.Provider value={{ addCoffee, addToppings, transaction }}>
          <ScrollToTop />
          <NavbarAdmin />
          <Switch>
            <Route path="/admin" exact component={Admin} />
            <Route path="/admin/add-product" component={AddProduct} />
            <Route path="/admin/add-topping" component={AddTopping} />
            <Route path="/admin/income-transaction" component={IncomeTransaction} />
            <Route path="/*" component={NoMatch} />
          </Switch>
          <Footer />
        </context.Provider>
      </Router>
    );
  }
}

export const context = createContext();
export default App;
