import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import UserContext from "../contexts/UserContext";

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className="mx-auto col-lg-10 border rounded"
      bg="light"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-gradient">
          BookingApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-2 flex-row">
            <Nav.Link
              as={NavLink}
              to="/flights"
              className="d-flex align-items-center"
              style={{ minHeight: 40 }}
            >
              <i className="bi bi-airplane me-2"></i>
              Flights
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/my-bookings"
              className="d-flex align-items-center"
              style={{ minHeight: 40 }}
            >
              <i className="bi bi-journal-bookmark me-2"></i>
              My Bookings
            </Nav.Link>
            {user && user.isAdmin === true && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/admin/manage-flights"
                  className="d-flex align-items-center"
                  style={{ minHeight: 40 }}
                >
                  <i className="bi bi-airplane me-2"></i>
                  Manage Flights
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/admin/manage-airports"
                  className="d-flex align-items-center"
                  style={{ minHeight: 40 }}
                >
                  <i className="bi bi-building me-2"></i>
                  Manage Airports
                </Nav.Link>
              </>
            )}
            {user && (
              <Nav.Link
                onClick={handleLogout}
                className="d-flex align-items-center"
                style={{ cursor: "pointer", minHeight: 40 }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
