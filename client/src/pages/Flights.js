import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import moment from "moment";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/flights`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }
        const data = await response.json();
        setFlights(data);
        setFilteredFlights(data);
        // Extract unique destinations for filter dropdown
        const dests = Array.from(
          new Set(data.map((f) => f.destination?.name || ""))
        ).filter((d) => d);
        setDestinations(dests);
      } catch (error) {
        console.error(error);
        Swal.fire("Error fetching flights");
      }
    };
    fetchFlights();
  }, []);

  useEffect(() => {
    let filtered = flights;
    if (selectedDestination) {
      filtered = filtered.filter(
        (f) => f.destination?.name === selectedDestination
      );
    }
    if (selectedDate) {
      filtered = filtered.filter((f) =>
        moment(f.departureDate).isSame(selectedDate, "day")
      );
    }
    setFilteredFlights(filtered);
  }, [selectedDestination, selectedDate, flights]);

  const formatDate = (dateString) => {
    try {
      return moment(dateString).format("MMM DD, YYYY");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Container>
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <Form className="row g-3 align-items-end">
            <Form.Group className="col-md-5">
              <Form.Label className="fw-bold">Destination</Form.Label>
              <Form.Select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                aria-label="Select destination"
              >
                <option value="">All Destinations</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-5">
              <Form.Label className="fw-bold">Departure Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>
            <div className="col-md-2 d-flex align-items-end">
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={() => {
                  setSelectedDestination("");
                  setSelectedDate("");
                }}
              >
                <i className="bi bi-x-circle me-1"></i>Clear
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      {filteredFlights.length === 0 ? (
        <div className="text-center py-5">
          <h3>
            <i className="bi bi-emoji-frown text-secondary me-2"></i>
            No flights found
          </h3>
        </div>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {filteredFlights.map((flight) => (
            <Col key={flight._id}>
              <Card className="h-100 shadow border-0 booking-card">
                <Card.Header
                  className="d-flex justify-content-between align-items-center text-white"
                  style={{
                    background: "linear-gradient(135deg, #0d6efd, #084298)",
                  }}
                >
                  <h5 className="mb-0 d-flex align-items-center">
                    <i className="bi bi-ticket-detailed me-2"></i> Flight{" "}
                    {flight.flightNumber}
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="flight-route d-flex align-items-center justify-content-between mb-4">
                    <div className="text-center">
                      <div className="city-code fw-bold fs-4">
                        <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                        {flight.origin?.code}
                      </div>
                      <div className="city-name text-muted">
                        {flight.origin?.name}
                      </div>
                    </div>
                    <div className="flight-path flex-grow-1 px-3">
                      <div className="flight-line position-relative">
                        <hr style={{ borderTop: "2px dashed #ccc" }} />
                        <span className="position-absolute top-50 start-50 translate-middle bg-white px-2">
                          <i className="bi bi-airplane-engines text-primary"></i>
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="city-code fw-bold fs-4">
                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                        {flight.destination?.code}
                      </div>
                      <div className="city-name text-muted">
                        {flight.destination?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flight-details p-3 bg-light rounded mb-3">
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-calendar-date me-2 text-primary"></i>
                          <div>
                            <div className="text-muted small">Date</div>
                            <div className="fw-bold">
                              {formatDate(flight.departureDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-clock-history me-2 text-primary"></i>
                          <div>
                            <div className="text-muted small">Time</div>
                            <div className="fw-bold">
                              {flight.departureTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="booking-date small text-muted mb-1">
                    <i className="bi bi-cash-coin me-1 text-success"></i> PHP{" "}
                    {Number(flight.price).toFixed(2)}
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-0 pt-0 pb-3 px-4">
                  <Button
                    className="w-100 d-flex align-items-center btn-theme-outline justify-content-center"
                    onClick={() => navigate(`/flight/${flight._id}`)}
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    <span>Select Flight</span>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
