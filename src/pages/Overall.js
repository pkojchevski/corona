import React, { useState, Fragment } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GeoMap from "../components/d3_visualization/GeoMap";
import Search from "../components/Search";
import ChartGlobal from "../components/Charts/ChartGlobal";
import ChartPieGlobal from "../components/Charts/ChartPieGlobal";
import ModalCharts from "../components/Layout/ModalCharts";
import { data } from "../utils/data";
import Numbers from "../components/Numbers";
import Footer from "../components/Layout/Footer";

import { useCoronaGlobalValues } from "../context";

function Overall() {
  console.log("overall");
  const {
    coronaGlobal,
    coronaGlobalRed,
    coronaGlobalGreen,
    globalTotal,
    globalRedTotal,
    globalGreenTotal,
    lastUpdate
  } = useCoronaGlobalValues();
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [total, setTotal] = useState(0);
  const [property, setProperty] = useState("pop_est");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleCountry = country => {
    setCountry(country);
  };

  const handleTotal = total => setTotal(total);
  return (
    <Fragment>
      <ModalCharts
        show={show}
        handleClose={handleClose}
        country={country}
        total={total}
        lastUpdate={lastUpdate}
        orange={
          coronaGlobal.length > 0 &&
          coronaGlobal.filter(el => el.Country === country)[0]
        }
        red={
          coronaGlobalRed.length > 0 &&
          coronaGlobalRed.filter(el => el.Country === country)[0]
        }
        green={
          coronaGlobalGreen.length > 0 &&
          coronaGlobalGreen.filter(el => el.Country === country)[0]
        }
      />
      <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
        <Search
          handleShow={handleShow}
          handleClose={handleClose}
          handleCountry={handleCountry}
          handleTotal={handleTotal}
        />
      </Row>
      <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
        <Numbers
          red={globalRedTotal}
          orange={globalTotal}
          green={globalGreenTotal}
        />
      </Row>
      <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
        <Col>
          <GeoMap data={data} property={property} />
        </Col>
      </Row>
      <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
        <Col xs={12}>
          <ChartPieGlobal
            red={globalRedTotal}
            orange={globalTotal}
            green={globalGreenTotal}
          />
        </Col>
        <Col xs={12}>
          <ChartGlobal
            daily={false}
            red={coronaGlobalRed}
            orange={coronaGlobal}
            green={coronaGlobalGreen}
          />
        </Col>
      </Row>
      <Footer lastUpdate={lastUpdate} />
    </Fragment>
  );
}

export default Overall;
