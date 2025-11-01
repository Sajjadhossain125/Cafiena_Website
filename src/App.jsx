import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRouters from "./routes/userRoutes";
import { useState, Suspense } from "react";
import Router from "./routes/Router";
import { Route } from "react-router-dom";

function App() {
  const [allRoutes] = useState([...publicRoutes, ...adminRoutes,...userRouters]);
  const isAdminRoute = window.location.pathname.startsWith("/admin"); // ok if BrowserRouter is above App

  return (
    <>
      {!isAdminRoute && <Header />}
      <Suspense fallback={<div>Loading Page...</div>}>
        <Router allRoutes={allRoutes} />
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
