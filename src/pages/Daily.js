import React, { useState, Fragment } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GeoMap from "../components/d3_visualization/GeoMap";
import Search from "../components/Search";
import ChartGlobal from "../components/Charts/ChartGlobal";
import ChartPieGlobal from "../components/Charts/ChartPieGlobal";
import ModalCharts from "../components/Layout/ModalCharts";
import { data } from "../utils/data";
import Footer from "../components/Layout/Footer";

import { useCoronaGlobalValues } from "../context";
import Numbers from "../components/Numbers";

import Spinner from "../components/Layout/Spinner";

function Daily() {
  console.log("daily");
  const {
    dailyRedTotal,
    dailyGreenTotal,
    dailyOrangeTotal,
    coronaGlobal,
    coronaGlobalRed,
    coronaGlobalGreen,
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
        lastUpdate={lastUpdate}
        show={show}
        handleClose={handleClose}
        country={country}
        total={total}
        daily={true}
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
          orange={dailyOrangeTotal}
          red={dailyRedTotal}
          green={dailyGreenTotal}
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
            red={dailyRedTotal}
            green={dailyGreenTotal}
            orange={dailyOrangeTotal}
          />
        </Col>
          <Col xs={12}>
            <ChartGlobal
              red={coronaGlobalRed}
              green={coronaGlobalGreen}
              orange={coronaGlobal}
              daily={true}
            />
          </Col>
      </Row>
      <Footer lastUpdate={lastUpdate} />
    </Fragment>
  );
}

export default Daily;
