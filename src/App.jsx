import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./ui/pages/Home";
import Playground from "./ui/pages/Playground";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

