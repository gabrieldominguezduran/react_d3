/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { arc, csv, DSVRowArray, pie, PieArcDatum } from "d3";

const url =
  "https://gist.githubusercontent.com/gabrieldominguezduran/fb36bd88d19db61f960dd8af75f5018a/raw/colors.csv";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const ColorsChart = () => {
  const [data, setData] = useState<DSVRowArray<string>>();

  const pieArc = arc().innerRadius(0).outerRadius(width);
  const colorPie = pie().value(1);

  useEffect(() => {
    csv(url).then((data) => setData(data));
  }, []);
  if (!data) {
    return <pre className="ColorsChart">Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data as any).map(
          (d: PieArcDatum<number | { valueOf(): number }>) => (
            <path
              key={Math.random()}
              fill={(d.data as { [key: string]: any })["hex_value"].toString()}
              d={pieArc(d as any)!}
            />
          )
        )}
      </g>
    </svg>
  );
};

export default ColorsChart;
