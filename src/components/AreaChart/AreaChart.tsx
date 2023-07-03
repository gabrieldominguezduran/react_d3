import { useEffect } from "react";
import * as d3 from "d3";
import { Types } from "./types";

const AreaChart = (props: AreaChartProps) => {
  useEffect(() => {
    return () => {
      draw();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = () => {
    const width = props.width - props.left - props.right;
    const height = props.height - props.top - props.bottom;

    const svg = d3
      .select(".areaChart")
      .append("svg")
      .attr("width", width + props.left + props.right)
      .attr("height", height + props.top + props.bottom)
      .append("g")
      .attr("transform", `translate(${props.left},${props.top})`);

    d3.csv("/data/line.csv", (d) => {
      const date = d.Date ? d3.timeParse("%Y-%m-%d")(d.Date) : null;

      return {
        date,
        value: d.Open,
      };
    }).then((data) => {
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, (d) => {
            return d.date;
          }) as [Date, Date]
        )
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, (d) => {
            return d.value ? +d.value : 0;
          }),
        ] as number[])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", props.fill)
        .attr("stroke", "white")
        .attr("stroke-width", 1.6)
        .attr(
          "d",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => {
              return x((d as unknown as { date: number }).date);
            })
            .y0(y(0))
            .y1((d) => {
              return y((d as unknown as Types.Data).value);
            })
        );
    });
  };

  return <div className="areaChart" data-testid="areaChart" />;
};

interface AreaChartProps {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  fill: string;
}

export default AreaChart;
