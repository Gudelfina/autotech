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
    <>
    <nav className=" display-flex navbar navbar-expand-lg navbar-dark bg-success">
    <div>
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
    </div>
      <div className="container-fluid justify-content-space-between ">
        {/* <button className="navbar-toggler" type="button" onClick={handleMouseEnter}>
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className={`navcenter navbar-nav ${isOpen ? 'open' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
            <div className="dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="saleRecordDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={isOpen}>
                Sale Record
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="saleRecordDropdown">
                <li><NavLink className="dropdown-item" to="/sale-record" onClick={handleClick}>List Sale Record</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sale-record/create" onClick={handleClick}>Create Sale Record</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Nav;
