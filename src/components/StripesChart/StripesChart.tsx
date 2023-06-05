/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from "d3";
import { useEffect } from "react";
const StripesChart = () => {
  useEffect(() => {
    return () => {
      readData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const readData = () => {
    d3.csv("/data/nasa_temp.csv", processData)
      .then((data) => graph(data))
      .catch((error) => console.error("Error:", error.message));

    function processData(d: any) {
      const dataItem = {
        year: parseFloat(d.Year) || 0.0,
        avg: parseFloat(d["J-D"]) || 0.0,
      };
      return dataItem;
    }

    function graph(data: any) {
      const colors = [
        "#f7fbff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b5",
        "#08519c",
        "#08306b",
        "#fff5eb",
        "#fee6ce",
        "#fdd0a2",
        "#fdae6b",
        "#fd8d3c",
        "#f16913",
        "#d94801",
        "#a63603",
        "#7f2704",
      ];
      const linearScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d: any) => d.avg),
          d3.max(data, (d: any) => d.avg),
        ] as any[])
        .range([0, colors.length - 1]);

      const svg = d3
        .select(".stripesChart")
        .append("svg")
        .attr("width", data.length * 4)
        .attr("height", 300);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 4)
        .attr("height", 300)
        .attr("x", (_d: any, i: any) => i * 4)
        .attr("y", 0)
        .attr("fill", (d: any) => colors[Math.round(linearScale(d.avg))])
        .on("mouseover", function () {
          d3.select(this).style("stroke", "black");
        })
        .on("mouseout", function () {
          d3.select(this).style("stroke", "none");
        })
        .append("title")
        .text((d: any) => `Year: ${d.year} Avg: ${d.avg}`);
    }
  };
  return <div className="stripesChart" />;
};

export default StripesChart;
