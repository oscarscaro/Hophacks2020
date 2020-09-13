import React from "react";
import { Card, CardDeck, Container, Row } from "react-bootstrap";

export default ({ selectedCounty, incident }) => (
  <Container
    fluid
    style={{
      height: "100vh",
      backgroundColor: "#1E212B",
      paddingTop: "1rem",
      overflowY: "scroll",
    }}
  >
    <h1
      style={{
        color: "white",
        fontFamily: "arial",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "1.25rem",
        textAlign: "center",
      }}
    >
      {selectedCounty === null ? "California" : selectedCounty.properties.name}
    </h1>
    <CardDeck style={{ marginTop: "2rem" }}>
      {incident &&
        incident
          .filter(
            ({ County }) =>
              selectedCounty === null ||
              County === selectedCounty.properties.name
          )
          .map((incident) => (
            <Card
              style={{
                width: "calc(50% - 30px)",
                flex: "none",
                marginBottom: ".5rem",
              }}
            >
              <Card.Header>
                <Card.Title>{incident.Name}</Card.Title>
                <Card.Subtitle>{incident.AdminUnit}</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>Location: {incident.Location}</Card.Text>
                <Card.Text>Latitude: {incident.Latitude}</Card.Text>
                <Card.Text>Longitude: {incident.Longitude}</Card.Text>
                <Card.Text>Acres Burned: {incident.AcresBurned}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Text>{incident.Started}</Card.Text>
              </Card.Footer>
            </Card>
          ))}
    </CardDeck>
  </Container>
);
