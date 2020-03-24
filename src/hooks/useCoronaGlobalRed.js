import { useEffect, useState } from "react";

import { csvJSON, sumCountryQty } from "../utils/utils";
import axios from "axios";

const useCoronaGlobalRed = () => {
  const [coronaGlobalRed, setCoronaGlobalRed] = useState([]);
  const [globalRedTotal, setGlobalRedTotal] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    axios
      .get(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv"
      )
      .then(res => {
        const allData = sumCountryQty([...csvJSON(res.data)]);

        allData.map(obj => {
          obj.total = +obj[Object.keys(obj)[Object.keys(obj).length - 1]];
          return obj;
        });
        // console.log("merge:", merge);
        // console.log("allData:", allData);
        if (JSON.stringify(coronaGlobalRed) !== JSON.stringify(allData)) {
          console.log("update from hooks");
          setCoronaGlobalRed(allData);
          setGlobalRedTotal(
            allData
              .map(el => el.total)
              .reduce((acc, val) => acc + (+val || 0), 0)
          );
        }
      })
      .catch(err => console.log("err:", err));
  }, [coronaGlobalRed]);

  return {
    coronaGlobalRed,
    globalRedTotal
  };
};

export default useCoronaGlobalRed;
