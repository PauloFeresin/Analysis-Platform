import ApiList from "./components/ApiList";
import LogList from "./components/LogList";
import "./App.css"

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div className="container">
        <div className="box">
          <h2>APIs Monitoradas</h2>
          <ApiList />
        </div>

        <div className="box">
          <h2>Logs</h2>
          <LogList />
        </div>
      </div>
    </div>
  );
}

export default App;
