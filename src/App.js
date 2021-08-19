import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './guest/components/Navbar';
import Login from './access/Login';
import Register from './access/Register';
import './App.css';
import Footer from './assets/components/Footer';
import Guest from './guest/Guest';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Guest} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
