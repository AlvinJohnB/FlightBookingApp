import React from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function FlightSearchModal({ show, handleClose, flights }) {
  const navigate = useNavigate();

  const handleSelectFlight = (flightId) => {
    navigate(`/flight/${flightId}`);
    handleClose();
  };

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Flight Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {flights.length === 0 && <p className="text-muted">No flights found</p>}
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="card shadow-sm border-0 mb-3"
            style={{ minHeight: 0, padding: 0 }}
          >
            <div className="card-body d-flex flex-wrap align-items-center justify-content-between py-3 px-3">
              <div
                className="d-flex align-items-center"
                style={{ minWidth: 0 }}
              >
                <div className="text-center me-3">
                  <div className="city-code fw-bold fs-5">
                    <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                    {flight.origin.code}
                  </div>
                  <div className="city-name text-muted small">
                    {flight.origin.name}
                  </div>
                </div>
                <div className="mx-2 text-center">
                  <i className="bi bi-arrow-right fs-5 text-secondary"></i>
                </div>
                <div className="text-center ms-3">
                  <div className="city-code fw-bold fs-5">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    {flight.destination.code}
                  </div>
                  <div className="city-name text-muted small">
                    {flight.destination.name}
                  </div>
                </div>
              </div>
              <div
                className="d-flex flex-column align-items-end ms-3"
                style={{ minWidth: 120 }}
              >
                <span className="fw-bold text-primary mb-1">
                  {moment(flight.departureDate).format("MMM DD")},{" "}
                  {moment(flight.departureTime, "HH:mm").format("h:mm A")}
                </span>
                <span className="text-muted small mb-1">
                  Flight {flight.flightNumber}
                </span>
                <span className="fw-bold text-success">
                  ₱
                  {Number(flight.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mt-2 px-3"
                  onClick={() => handleSelectFlight(flight._id)}
                >
                  <i className="bi bi-arrow-right-circle me-1"></i> Select
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
