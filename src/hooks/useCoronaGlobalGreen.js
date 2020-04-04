import { useEffect, useState } from "react";

import { csvJSON, sumCountryQty } from "../utils/utils";
import axios from "axios";

const useCoronaGlobalGreen = () => {
  const [coronaGlobalGreen, setCoronaGlobalGreen] = useState([]);
  const [globalGreenTotal, setGlobalGreenTotal] = useState(0);
  const [dailyGreenTotal, setDailyGreenTotal] = useState(0);

  useEffect(() => {
    // console.log("useEffect");
    axios
      .get(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
      )
      .then(res => {
        const allData = sumCountryQty([...csvJSON(res.data)]);

        allData.map(obj => {
          obj.total = +obj[Object.keys(obj)[Object.keys(obj).length - 1]];
          obj.dailyTotal =
            +obj[Object.keys(obj)[Object.keys(obj).length - 2]] -
            +obj[Object.keys(obj)[Object.keys(obj).length - 3]];
          return obj;
        });
        // console.log(allData);
        if (JSON.stringify(coronaGlobalGreen) !== JSON.stringify(allData)) {
          setCoronaGlobalGreen(allData);
          setGlobalGreenTotal(
            allData
              .map(el => el.total)
              .reduce((acc, val) => acc + (+val || 0), 0)
          );

          setDailyGreenTotal(
            allData.map(el => el.dailyTotal).reduce((b, a) => b + (+a || 0), 0)
          );
        }
      })
      .catch(err => console.log("err:", err));
  }, [coronaGlobalGreen]);
  return {
    coronaGlobalGreen,
    globalGreenTotal,
    dailyGreenTotal
  };
};

export default useCoronaGlobalGreen;
