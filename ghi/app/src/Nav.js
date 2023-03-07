import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function handleMouseEnter() {
    setIsOpen(true);
  }

  function handleMouseLeave() {
    setIsOpen(false);
  }

  function handleClick() {
    setIsOpen(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" onClick={handleMouseEnter}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-nav ${isOpen ? 'open' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" id="manufacturerDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={isOpen}>
              Manufacturer
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="manufacturerDropdown">
              <li><NavLink className="dropdown-item" to="/manufacturer" onClick={handleClick}>List Manufacturer</NavLink></li>
              <li><NavLink className="dropdown-item" to="/manufacturer/create" onClick={handleClick}>Create Manufacturer</NavLink></li>
            </ul>
          </div>
          <div className="dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" id="vehicleModelDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={isOpen}>
              Vehicle Model
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="vehicleModelDropdown">
              <li><NavLink className="dropdown-item" to="/vehicle-model/" onClick={handleClick}>List Vehicle Model</NavLink></li>
              <li><NavLink className="dropdown-item" to="/vehicle-model/create" onClick={handleClick}>Create Vehicle Model</NavLink></li>
            </ul>
          </div>
          <div className="dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" id="automobileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={isOpen}>
              Automobile Inventory
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="automobileDropdown">
              <li><NavLink className="dropdown-item" to="/automobile" onClick={handleClick}>List Automobile Inventory</NavLink></li>
              <li><NavLink className="dropdown-item" to="/automobile/create" onClick={handleClick}>Create Automobile Inventory</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
