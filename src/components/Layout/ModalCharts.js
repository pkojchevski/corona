import React, { useState, useEffect } from "react";
import Charts from "../Charts/Charts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCoronaGlobalValues } from "../../context";

const ModalCharts = ({ show, country, handleClose, total }) => {
  
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
    </Modal>
  );
};

export default ModalCharts;
