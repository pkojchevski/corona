import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  geoMercator,
  min,
  max,
  scaleLinear,
  scaleOrdinal
} from "d3";
import useResizeObserver from "./userResizeObserver";
import { useCoronaGlobalValues } from "../../context";

const GeoChart = ({ data, property }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { mergedData } = useCoronaGlobalValues();

  useEffect(() => {
    const svg = select(svgRef.current);

    const minProp = min(mergedData, feature => feature.properties.corona);
    const maxProp = max(mergedData, feature => feature.properties.corona);
    const colorScale = scaleOrdinal()
      .domain([minProp, maxProp])
      .range(["#ccc", "red"]);
    //use resized dimensions
    //but fall back to getBoundingClientRect(), if no dimensions yet
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    //projects geo-coordinates on a 2d plate
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(200);
    // console.log("mergedData:", mergedData);
    // take geojson data
    //transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

    // render each country
    svg
      .selectAll(".country")
      .data(mergedData)
      .join("path")
      .on("click", feature => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .transition()
      .attr("fill", feature => colorScale(feature.properties.corona))
      .attr("d", feature => pathGenerator(feature));

    // render text
    // svg
    //   .selectAll(".label")
    //   .data([selectedCountry])
    //   .join("text")
    //   .attr("class", "label")
    //   .text(
    //     feature =>
    //       feature &&
    //       feature.properties.name +
    //         ": " +
    //         feature.properties.corona.toLocaleString()
    //   )
    //   .attr("x", 10)
    //   .attr("y", 25);
  }, [data, dimensions, property, selectedCountry, mergedData]);
  return (
    <div ref={wrapperRef} style={{ marginTop: "1rem" }}>
      <svg className="svg-map" ref={svgRef}></svg>
    </div>
  );
};

export default GeoChart;
