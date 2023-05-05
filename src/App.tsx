import "./App.css";
import LineChart from "./components/LineChart/LineChart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LineChart
          top={10}
          right={50}
          bottom={50}
          left={50}
          width={800}
          height={400}
          fill="yellow"
        />
      </header>
    </div>
  );
}

export default App;
