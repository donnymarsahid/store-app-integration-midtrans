import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './pages/guest/components/Navbar';
import NavbarUsers from './pages/users/components/Navbar';
import './App.css';
import Footer from './assets/components/Footer';
import Guest from './pages/guest/Guest';
import { useContext } from 'react';
import Users from './pages/users/Users';
import AllMenu from './pages/guest/AllMenu';
import AllMenuUsers from './pages/users/AllMenu';
import ScrollToTop from './assets/components/ScrollToTop';
import DetailPage from './pages/users/DetailPage';
import CartPage from './pages/users/CartPage';
import Profile from './pages/users/Profile';
import AddProduct from './pages/admin/AddProduct';
import AddTopping from './pages/admin/AddTopping';
import IncomeTransaction from './pages/admin/IncomeTransaction';
import Admin from './pages/admin/Admin';
import NavbarAdmin from './pages/admin/components/NavbarAdmin';
import NoMatch from './404/NoMatch';
import Store from './pages/guest/Store';
import CoffeeUsers from './pages/users/Coffee';
import Coffee from './pages/guest/Coffee';
import { UserContext } from './context/userContext';

function App() {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  console.log(localStorage.token);

  if (!state.isLogin) {
    return (
      <Router>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Guest} />
          <Route path="/all-menu" component={AllMenu} />
          <Route path="/coffee" component={Coffee} />
          <Route path="/store" component={Store} />
          <Route path="/*" component={NoMatch} />
        </Switch>
        <Footer />
      </Router>
    );
  }

  if (state.user.status === 'user') {
    return (
      <>
        <Router>
          <ScrollToTop />
          <NavbarUsers />
          <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/all-menu" component={AllMenuUsers} />
            <Route path="/coffee" component={CoffeeUsers} />
            <Route path="/detail-page/:id" component={DetailPage} />
            <Route path="/cart-page" component={CartPage} />
            <Route path="/profile" component={Profile} />
            <Route path="/store" component={Store} />
            <Route path="/*" component={NoMatch} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }

  if (state.user.status === 'admin') {
    return (
      <Router>
        <ScrollToTop />
        <NavbarAdmin />
        <Switch>
          <Route path="/" exact component={Admin} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/add-product" component={AddProduct} />
          <Route path="/admin/add-topping" component={AddTopping} />
          <Route path="/admin/income-transaction" component={IncomeTransaction} />
          <Route path="/*" component={NoMatch} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
