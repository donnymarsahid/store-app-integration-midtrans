import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './guest/components/Navbar';
import Login from './access/Login';
import Register from './access/Register';
import './App.css';
import Footer from './assets/components/Footer';
import Guest from './guest/Guest';
import { useEffect, useState } from 'react';
import dataCoffeeJson from './data/coffee.json';
import { createContext } from 'react';

function App() {
  const [dataCoffee, setDataCoffee] = useState([]);

  useEffect(() => {
    setDataCoffee(dataCoffeeJson);
  }, [dataCoffee]);

  return (
    <>
      <Router>
        <context.Provider value={{ dataCoffee }}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Guest} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
          <Footer />
        </context.Provider>
      </Router>
    </>
  );
}

export const context = createContext();
export default App;
