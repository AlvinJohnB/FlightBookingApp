import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import AppNavbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

export default function Layout({ children }) {
  const { user } = useContext(UserContext);

  //   if (user === null) {
  //     return <Navigate to="/login" />;
  //   }

  return (
    <>
      <div className="container-fluid hero-section py-1 py-md-3">
        <AppNavbar />
        <div className="row mt-3 mt-md-5">
          <div className="mt-md-5 mt-xl-1 col-12 ">
            <h1>{children.props.heading}</h1>
            <p>{children.props.description}</p>
          </div>
        </div>
      </div>

      {/* Destinations */}
      <div className="container-fluid bg-light py-5">{children}</div>

      <footer className="bg-dark text-light pt-4 pb-2 mt-5">
        <div className="container">
          <div className="row align-items-center just">
            <div className="col-md-6 mb-3 mb-md-0 text-center text-md-start">
              <h5 className="mb-2">BookingApp</h5>
              <p className="mb-1 small">
                &copy; 2025 BookingApp. All rights reserved.
              </p>
              <p className="mb-0 small">
                Designed by: Krisha Fabonan, Cherilyn Abe, Alvin John Bregana
              </p>
            </div>
            <div className="col-md-6 mb-3 mb-md-0 text-center">
              <h6 className="mb-2">Quick Links</h6>
              <a href="/" className="text-light me-3 text-decoration-none">
                Home
              </a>
              <a
                href="/flights"
                className="text-light me-3 text-decoration-none"
              >
                Flights
              </a>
              <a href="/mybookings" className="text-light text-decoration-none">
                My Bookings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
