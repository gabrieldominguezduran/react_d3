import "./App.css";
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
        width={800}
        height={400}
        fill="yellow"
      />
      <ColorsChart />
      <StripesChart />
    </div>
  );
}

export default App;
