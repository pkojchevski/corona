import React from "react";
import Charts from "../Charts/Charts";
import Modal from "react-bootstrap/Modal";
import "odometer/themes/odometer-theme-train-station.css";
import Footer from "../Layout/Footer";

const ModalCharts = ({
  orange,
  show,
  country,
  handleClose,
  daily,
  lastUpdate,
  total
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%" }}>
          {country} <span style={{ float: "right" }}>{total}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ marginLeft: "-2rem" }}>
        <Charts country={country} />
      </Modal.Body>
      <Footer lastUpdate={lastUpdate} />
    </Modal>
  );
};

export default ModalCharts;
