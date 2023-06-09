import "./App.css";
import AreaChart from "./components/AreaChart/AreaChart";
import BarChart from "./components/BarChart/BarChart";
import ColorsChart from "./components/ColorsChart/ColorsChart";
import LineChart from "./components/LineChart/LineChart";
import StripesChart from "./components/StripesChart/StripesChart";

function App() {
  return (
    <div className="App">
      <LineChart
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={1000}
        height={400}
        fill="yellow"
      />
      <ColorsChart />
      <StripesChart />
      <AreaChart
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={1000}
        height={400}
        fill="tomato"
      />
      <BarChart
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={1000}
        height={400}
        fill="#68C16E"
      />
    </div>
  );
}

export default App;
