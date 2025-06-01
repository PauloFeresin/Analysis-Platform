import { useState, useEffect } from "react";

function LogList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/logs")
      .then((response) => response.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar APIs:", error);
        setLoading(false);
        setError("Erro ao carregar logs");
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

return (
  <div>
    <input
      type="text"
      placeholder="Filtrar por nome ou status..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
      style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
    />

    <ul>
      {logs
        .filter(log => 
            log.status.toString().includes(filter) ||
            log.name.toLowerCase().includes(filter.toLowerCase()))
        .map(log => (
          <li key={log._id} className="log-item">
            <div><b>Name:</b> {log.name}</div>
            <div><b>URL:</b> {log.url}</div>
            <div><b>Status:</b> {log.status}</div>
            <div><b>Response Time:</b> {log.responseTime}</div>
            <div><b>Error:</b> {log.error}</div>
          </li>
        ))
      }
    </ul>
  </div>
);

}

export default LogList;
