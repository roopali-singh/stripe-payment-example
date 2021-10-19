import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Footer from "./components/sharedComponents/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Hk40EHSlY6Ot9iD1czZrIzMDlruiT4DOP9oM31PsQZk0fYj13sKxLfHljT9z3mPkIk9Gp7ioAIkKN0MEdCzxBRF009J1j6vo4"
);

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
            <Footer />
          </Route>
          <Route path="/">
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
