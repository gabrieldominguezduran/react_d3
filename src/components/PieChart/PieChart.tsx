import { useEffect } from "react";
import * as d3 from "d3";
import { PieArcDatum } from "d3-shape";
import { Types } from "./types";

const PieChart = (props: IPieChartProps) => {
  useEffect(() => {
    return () => {
      draw();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = () => {
    const width = props.width - props.left - props.right;
    const height = props.height - props.top - props.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(".pieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    d3.csv("/data/pie.csv", (d) => {
      const res = d as unknown as Types.Data;
      return {
        name: res.name,
        value: res.value,
      };
    }).then((data) => {
      const color = d3
        .scaleOrdinal()
        .domain(
          d3.extent(data, (d) => {
            return d.name;
          }) as unknown as string
        )
        .range(d3.schemeCategory10);

      const pie = d3
        .pie<Types.Data>()
        .sort(null)
        .value((record) => record.value);

      const path = d3
        .arc<PieArcDatum<Types.Data>>()
        .innerRadius(0)
        .outerRadius(radius);

      const pieData = pie(data);

      const arch = svg
        .selectAll(".arc")
        .data(pieData)
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("fill", (d) => {
          return color(d.data.name) as string;
        });

      arch.append("path").attr("d", path);
    });
  };

  return <div className="pieChart" />;
};

interface IPieChartProps {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export default PieChart;
