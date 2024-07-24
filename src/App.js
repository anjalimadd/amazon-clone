import { Checkbox } from "@material-ui/core";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import PaymentSuccess from "./PaymentSuccess";

function App() {
  const [{}, dispatch] = useStateValue();

  const promise = loadStripe(
    "pk_test_51MiKknSFw2QbcGxan9xOYY0wGeoSNWKonOtmml3ztGyoS0n15Ss2Vee6N6iHN5isE3dpbTgqCTRYc50YUybUrw9100bmQhFHhz"
  );

  useEffect(() => {
    // will only run once when the app component loads...

    onAuthStateChanged(auth, (authUser) => {
      // console.log('THE USER IS >>> ', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
                }
                />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
