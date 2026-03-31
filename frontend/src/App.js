import { useEffect, useState } from "react";
import "./App.css";

// ✅ Use environment variable
const API = process.env.REACT_APP_API_URL;
console.log("API:", API);

function App() {
  const [student, setStudent] = useState({
    name: "",
    course: "",
    email: "",
    year: ""
  });

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // FETCH ALL
  const fetchStudents = async () => {
    const res = await fetch(`${API}/api/students`);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // ADD or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // UPDATE
      await fetch(`${API}/api/students/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });
    } else {
      // ADD
      await fetch(`${API}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });
    }

    setStudent({ name: "", course: "", email: "", year: "" });
    setEditId(null);
    fetchStudents();
  };

  // LOAD DATA INTO FORM
  const handleEdit = (s) => {
    setStudent({
      name: s.name,
      course: s.course,
      email: s.email,
      year: s.year
    });
    setEditId(s._id);
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/api/students/${id}`, {
      method: "DELETE"
    });
    fetchStudents();
  };

  // SEARCH
  const handleSearch = async () => {
    const res = await fetch(
      `${API}/api/students/search?query=${search}`
    );
    const data = await res.json();
    setStudents(data);
  };

  return (
    <div className="container">
      <h2>🎓 Student MERN CRUD</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />

        <select name="course" value={student.course} onChange={handleChange} required>
          <option value="">Select Course</option>
          <option value="CSE">CSE</option>
          <option value="CSM">CSM</option>
        </select>

        <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
        <input name="year" placeholder="Year" value={student.year} onChange={handleChange} required />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="search-box">
        <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchStudents}>Reset</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.email}</td>
              <td>{s.year}</td>
              <td className="actions">
                <button className="edit-btn" onClick={() => handleEdit(s)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;