import React, { useEffect, useState } from "react";
import Charts from "../Charts/Charts";
import Modal from "react-bootstrap/Modal";
import "odometer/themes/odometer-theme-train-station.css";
import Footer from "../Layout/Footer";
import Numbers from "../Numbers";

const ModalCharts = ({
  orange,
  red,
  green,
  show,
  country,
  handleClose,
  daily,
  lastUpdate,
  total
}) => {
  const [orangeTotal, setOrangeTotal] = useState(0);
  const [redTotal, setRedTotal] = useState(0);
  const [greenTotal, setGreenTotal] = useState(0);

  useEffect(() => {
    if (daily) {
      setOrangeTotal(orange && orange.dailyTotal);
      setRedTotal(red && red.dailyTotal);
      setGreenTotal(green && green.dailyTotal);
    } else {
      setGreenTotal(green && green.dailyTotal);
      setOrangeTotal(orange && orange.dailyTotal);
      setRedTotal(red && red.dailyTotal);
    }
  }, [orange, red, green]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%" }}>
          {/* {country} <span style={{ float: "right" }}>Total:{total}</span> */}
          {country}
          <Numbers orange={orangeTotal} red={redTotal} green={greenTotal} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ marginLeft: "-2rem" }}>
        <Charts country={country} />
      </Modal.Body>
      <Modal.Footer>
        {daily ? (
          <p className="text-center">
            <cite>
              Daily results from:{" "}
              {lastUpdate && lastUpdate.substring(4, lastUpdate.length)}
            </cite>
          </p>
        ) : (
          <p className="text-center">
            <cite>
              Global results from:{" "}
              {lastUpdate && lastUpdate.substring(4, lastUpdate.length)}
            </cite>
          </p>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCharts;
