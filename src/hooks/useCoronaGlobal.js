import { useEffect, useState } from "react";

import { csvJSON, mergeObjectsInArray, sumCountryQty } from "../utils/utils";
import axios from "axios";
import { data } from "../utils/data";

const useCoronaGlobal = () => {
  const [coronaChartGlobal, setCoronaChartGlobal] = useState([]);
  const [coronaGlobal, setCoronaGlobal] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [countries, setCountries] = useState();
  const [globalTotal, setGlobalTotal] = useState(0);
  const [dailyOrangeTotal, setDailyOrangeTotal] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    // console.log("useEffect");
    axios
      .get(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
      )
      .then(res => {
        let merge = [];
        /// global data
        const allData = sumCountryQty([...csvJSON(res.data)]);
        allData.map(obj => {
          obj.total = +obj[Object.keys(obj)[Object.keys(obj).length - 1]];
          obj.dailyTotal =
            +obj[Object.keys(obj)[Object.keys(obj).length - 2]] -
            +obj[Object.keys(obj)[Object.keys(obj).length - 3]];
          obj.lastUpdate = Object.keys(obj)[Object.keys(obj).length - 3];
          return obj;
        });

        for (let corona of allData) {
          for (let geo of data.features) {
            if (
              corona.Country.toLowerCase().trim() ===
              geo.properties.name.toLowerCase().trim()
            ) {
              geo.properties.corona = corona.total;
              corona.countryId = geo.id;
              merge.push({ ...geo });
            }
          }
        }

        // console.log("merge:", merge);
        // console.log("allData:", allData);
        if (JSON.stringify(coronaGlobal) !== JSON.stringify(allData)) {
          // console.log("update from hooks");
          setCoronaGlobal(allData);
          setLastUpdate(allData.map(el => el.lastUpdate)[1]);
          setCountries(allData.map(el => el.Country));
          setMergedData(merge);
          setGlobalTotal(
            allData
              .map(el => el.total)
              .reduce((acc, val) => acc + (+val || 0), 0)
          );
        }
        setDailyOrangeTotal(
          allData.map(el => el.dailyTotal).reduce((b, a) => b + (+a || 0), 0)
        );
      })
      .catch(err => console.log("err:", err));
  }, [coronaGlobal, coronaChartGlobal]);

  return {
    coronaGlobal,
    coronaChartGlobal,
    mergedData,
    setMergedData,
    countries,
    globalTotal,
    dailyOrangeTotal,
    lastUpdate
  };
};

export default useCoronaGlobal;
