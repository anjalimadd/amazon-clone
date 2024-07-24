import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Header from "./Header";
import "./PaymentSuccess.css";
import { useStateValue } from "./StateProvider";
import { collection, doc, query, orderBy, onSnapshot } from "firebase/firestore";

function PaymentSuccess() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user?.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="container">
      <Header />
      <div className="success__div">
        <h1>Your Payment is successful!</h1>
      </div>
    </div>
  );
}

export default PaymentSuccess;
