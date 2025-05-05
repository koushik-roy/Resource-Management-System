import React from "react";

import "../App.css";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink, Link } from "react-router-dom";

function Header() {
  const divStyles = {
    padding: "40px",
    marginLeft: "6rem",
    marginTop: "-50px",
    marginBottom: "-20px",
  };
  let history = useHistory();
  const onLinkClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("login");

    history.push("/");
  };
  const dropDownStyle = {
    marginTop: "-8px",
  };
  const dropDownStyleResource = {
    marginTop: "-8px",
    marginRight: "-20px",
  };

  return (
    <div style={{ height: "116px", background: "rgb(40 40 40)" }}>
      <div className="div-wrapper" style={divStyles}>
        <div className="row">
          <div className="col">
            <h3>
              <Link
                style={{
                  color: "white",
                  marginLeft: "2rem",
                  textDecoration: "none",
                }}
                to="/dashboard"
              >
                {" "}
                Resource Management System
              </Link>
            </h3>
          </div>

          <div className="col">
            <ul
              className="nav justify-content-end"
              style={{ marginLeft: "-15rem" }}
            >
              <li className="nav-item">
                <NavLink
                  to="/dashboard"
                  className="nav-link"
                  activeClassName="active"
                >
                 <b style={{color: "white"}}>Home</b> 
                </NavLink>
              </li>
              <li className="nav-item">
                <Navbar variant="light" expand="lg">
                  <Container fluid>
                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                    <Navbar.Collapse id="navbar-dark-example">
                      <Nav>
                        <NavDropdown
                          id="nav-dropdown-dark-example"
                          title= {<b style={{color: "white"}}>Resource</b>}
                          menuVariant="dark"
                          style={dropDownStyleResource}
                        >
                          <NavDropdown.Item>
                            <Link style={{ color: "black" }} to="/viewSkills">
                              View Skills
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link style={{ color: "black" }} to="/viewRoles">
                              View Roles
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link style={{ color: "black" }} to="/addResource">
                              Create Resource
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link
                              style={{ color: "black" }}
                              to="/viewResources"
                            >
                              View Resources
                            </Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
              </li>

              <li className="nav-item">
                <Navbar variant="light" expand="lg">
                  <Container fluid>
                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                    <Navbar.Collapse id="navbar-dark-example">
                      <Nav>
                        <NavDropdown
                          id="nav-dropdown-dark-example"
                          title={<b style={{color: "white"}}>Project</b>}
                          menuVariant="dark"
                          style={dropDownStyle}
                        >
                          <NavDropdown.Item>
                            <Link style={{ color: "black" }} to="/addProject">
                              Create Project
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link style={{ color: "black" }} to="/viewProjects">
                              View Projects
                            </Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/viewBusinessUnits"
                  className="nav-link"
                  activeClassName="active"
                >
                  <b style={{color: "white"}}>Business Unit</b>
                </NavLink>
              </li>
              <li className="nav-item">
                <Navbar variant="light" expand="lg">
                  <Container fluid>
                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                    <Navbar.Collapse id="navbar-dark-example">
                      <Nav>
                        <NavDropdown
                          id="nav-dropdown-dark-example"
                          title={<b style={{color: "white"}}>Customer</b>}
                          menuVariant="dark"
                          style={dropDownStyle}
                        >
                          <NavDropdown.Item>
                            <Link
                              style={{ color: "black" }}
                              to="/viewCustomers"
                            >
                              View Customer
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link
                              style={{ color: "black" }}
                              to="/viewCustomerCategory"
                            >
                              View Customer Category
                            </Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  onClick={onLinkClick}
                >
                  <b style={{color: "white"}}>Log Out</b>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
