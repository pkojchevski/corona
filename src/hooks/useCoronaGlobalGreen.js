import { useEffect, useState } from "react";

import { csvJSON, sumCountryQty } from "../utils/utils";
import axios from "axios";

const useCoronaGlobalGreen = () => {
  const [coronaGlobalGreen, setCoronaGlobalGreen] = useState([]);
  const [globalGreenTotal, setGlobalGreenTotal] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    axios
      .get(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv"
      )
      .then(res => {
        let merge = [];
        const allData = sumCountryQty([...csvJSON(res.data)]);

        allData.map(obj => {
          obj.total = +obj[Object.keys(obj)[Object.keys(obj).length - 1]];
          return obj;
        });
        if (JSON.stringify(coronaGlobalGreen) !== JSON.stringify(allData)) {
          setCoronaGlobalGreen(allData);
          setGlobalGreenTotal(
            allData
              .map(el => el.total)
              .reduce((acc, val) => acc + (+val || 0), 0)
          );
        }
      })
      .catch(err => console.log("err:", err));
  }, [coronaGlobalGreen]);
  return {
    coronaGlobalGreen,
    globalGreenTotal
  };
};

export default useCoronaGlobalGreen;
