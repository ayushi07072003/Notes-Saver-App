import React from 'react';
import '../index.css';

import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className=" w-full flex justify-evenly p-4 bg-slate-400">
      <NavLink to="/" className="text-lg text-gray-700">Home</NavLink>
      <NavLink to="/pastes" className="text-lg text-gray-700">Pastes</NavLink>
    </div>
  );
}

