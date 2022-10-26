import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserDetail from "./components/UserDetails/userDetail";
import EntireComponent from "./components/_main/_main";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntireComponent />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
