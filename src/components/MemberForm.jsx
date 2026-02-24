import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function MemberForm() {

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/api/v1/members/${id}`)
        .then(res => setName(res.data.result.name));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Le nom est obligatoire !");
      return;
    }

    if (id) {
      axios.put(`http://localhost:8081/api/v1/members/${id}`, { name })
        .then(() => navigate("/"));
    } else {
      axios.post("http://localhost:8081/api/v1/members", { name })
        .then(() => navigate("/"));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {id ? "Modifier Membre" : "Ajouter Membre"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nom du membre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default MemberForm;