import { useState, useEffect } from "react";

function ApiList() {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sites")
      .then((response) => response.json())
      .then((data) => setApis(data))
      .catch((error) => console.error("Erro ao buscar APIs:", error));
  }, []);

  return (
    <div>
      <ul>
        {apis.map((api) => (
          <li key={api._id}>
            {api.name} - {api.url}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiList;
