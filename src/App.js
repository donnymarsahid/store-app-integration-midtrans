import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './guest/components/Navbar';
import Login from './access/Login';
import './App.css';
import Footer from './assets/components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
