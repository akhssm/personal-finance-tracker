import React from 'react';
import './styles.css';
function Header() {
  function logoutFnc() {
    alert("Logut!");
  }

  return (
    <div className="navbar">
      <p className='logo'>Financely.</p>
      <p className='logo link' onClick={logoutFnc}>Logout</p>
    </div>
  );
}

export default Header;
