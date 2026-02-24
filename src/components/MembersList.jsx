import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MembersList() {

  const [members, setMembers] = useState([]);

  const fetchMembers = () => {
    axios.get("http://localhost:8081/api/v1/members")
      .then(res => setMembers(res.data.result))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const deleteMember = (id) => {
    axios.delete(`http://localhost:8081/api/v1/members/${id}`)
      .then(() => fetchMembers());
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Liste des Membres</h2>

      <Link to="/add">
        <button style={styles.addBtn}>+ Ajouter</button>
      </Link>

      <ul style={styles.list}>
        {members.map(member => (
          <li key={member.id} style={styles.card}>
            <span style={styles.name}>{member.name}</span>

            <div>
              <Link to={`/edit/${member.id}`}>
                <button style={styles.editBtn}>Edit</button>
              </Link>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteMember(member.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  addBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  name: {
    fontWeight: "bold"
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default MembersList;