import * as d3 from "d3";
import { Types } from "./types";
import { useEffect } from "react";

const BarChart = (props: IBarChartProps) => {
  useEffect(() => {
    return () => {
      draw();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = () => {
    const width = props.width - props.left - props.right;
    const height = props.height - props.top - props.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(".barChart")
      .append("svg")
      .attr("width", width + props.left + props.right)
      .attr("height", height + props.top + props.bottom)
      .append("g")
      .attr("transform", `translate(${props.left},${props.top})`);

    d3.csv("/data/bar.csv", (d) => {
      return d as unknown as Types.Data;
    }).then((data) => {
      // Scale the range of the Data in the domains
      x.domain(
        data.map((d) => {
          return d.framework;
        })
      );
      y.domain([
        0,
        d3.max(data, () => {
          return Math.max(...data.map((dt) => (dt as Types.Data).value), 0);
        }),
      ] as number[]);

      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", props.fill)
        .attr("class", "bar")
        .attr("x", (d) => {
          return x(d.framework) || 0;
        })
        .attr("width", x.bandwidth())
        .attr("y", (d) => {
          return y(d.value);
        })
        .attr("height", (d) => {
          return height - y(d.value);
        });

      // add the x Axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // add the y Axis
      svg.append("g").call(d3.axisLeft(y));
    });
  };

  return <div className="barChart" />;
};

interface IBarChartProps {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  fill: string;
}

export default BarChart;
