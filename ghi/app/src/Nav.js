import { NavLink } from "react-router-dom";
import { useState } from "react";

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            CarCar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleMouseEnter}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse ${isOpen ? "show" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="manufacturerDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                >
                  Manufacturer
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="manufacturerDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/manufacturer/create"
                      onClick={handleClick}
                    >
                      Create Manufacturer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/manufacturer/"
                      onClick={handleClick}
                    >
                      List All Manufacturers
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="vehicleModelDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                >
                  Vehicle Model
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="vehicleModelDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/vehicle-model/create"
                      onClick={handleClick}
                    >
                      Create Vehicle Model
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/vehicle-model/"
                      onClick={handleClick}
                    >
                      List All Vehicle Models
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown ">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="automobileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                >
                  Automobile Inventory
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="automobileDropdown "
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/automobile/create"
                      onClick={handleClick}
                    >
                      Create Automobile Inventory
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/automobile/"
                      onClick={handleClick}
                    >
                      List All Automobile Inventory
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="saleRecordDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                >
                  Sales
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="saleRecordDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/sales-person/create"
                      onClick={handleClick}
                    >
                      Create Sales Person
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/customer/create"
                      onClick={handleClick}
                    >
                      Create Customer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/sale-record/create"
                      onClick={handleClick}
                    >
                      Create Sale Record
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/sale-record/"
                      onClick={handleClick}
                    >
                      List All Sales
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/sales-person/detail"
                      onClick={handleClick}
                    >
                      List Sales by Person{" "}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="technicianDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                >
                  New Technician
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="technicianDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/create/technician"
                      onClick={handleClick}
                    >
                      Create Technician
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown3"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Appointment
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/appointment/create">
                      Create Appointment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/appointment">
                      List Appointments
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
