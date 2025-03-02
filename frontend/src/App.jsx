import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Klaida gaunant API duomenis:", err));
  }, []);

  return (
    <div>
      <h1>BeautySalon</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
