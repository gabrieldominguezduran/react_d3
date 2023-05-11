import { useState, useEffect } from "react";
import * as d3 from "d3";

const url =
  "https://gist.githubusercontent.com/gabrieldominguezduran/fb36bd88d19db61f960dd8af75f5018a/raw/colors.csv";

const ColorsChart = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    d3.csv(url).then((data) => {
      setMessage(`
      Data: ${Math.round(d3.csvFormat(data).length / 1024)} KB
       ${data.length} Rows 
       ${data.columns.length} Columns`);
      return setData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("DATA: ", data);
  return (
    <pre className="ColorsChart">
      {Object.keys(data).length === 0 ? "Loading..." : message}
    </pre>
  );
};

export default ColorsChart;
