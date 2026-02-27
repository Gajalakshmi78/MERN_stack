import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/vibes";

function App() {
  const emptyForm = {
    destination: "",
    country: "",
    continent: "",
    bestTimeToVisit: "",
    estimatedBudgetUSD: "",
    famousFor: "",
    activities: "",
    isVisaRequired: false
  };

  const [vibes, setVibes] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  // ================= FETCH =================
  const fetchVibes = async () => {
    try {
      const res = await axios.get(API);
      setVibes(res.data);
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
  const loadVibes = async () => {
    try {
      const response = await fetch("http://localhost:3000/vibes");
      const data = await response.json();
      setVibes(data);   // ✅ now inside async function
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  loadVibes();
}, []);
  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      estimatedBudgetUSD: Number(formData.estimatedBudgetUSD),
      famousFor: formData.famousFor
        ? formData.famousFor.split(",").map((item) => item.trim())
        : [],
      activities: formData.activities
        ? formData.activities.split(",").map((item) => item.trim())
        : []
    };

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, processedData);
      } else {
        await axios.post(API, processedData);
      }

      setFormData(emptyForm);
      setEditingId(null);
      fetchVibes();

    } catch (error) {
      console.error(error);
    }
  };

  // ================= EDIT =================
  const handleEdit = (vibe) => {
    setEditingId(vibe._id);

    setFormData({
      destination: vibe.destination || "",
      country: vibe.country || "",
      continent: vibe.continent || "",
      bestTimeToVisit: vibe.bestTimeToVisit || "",
      estimatedBudgetUSD: vibe.estimatedBudgetUSD || "",
      famousFor: vibe.famousFor?.join(", ") || "",
      activities: vibe.activities?.join(", ") || "",
      isVisaRequired: vibe.isVisaRequired || false
    });
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchVibes();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= UI =================
  return (
    <div style={{ width: "85%", margin: "auto", fontFamily: "Arial" }}>
      <h1>🌍 Exploring New Vibes - CRUD</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="destination" placeholder="Destination"
          value={formData.destination}
          onChange={handleChange} required />

        <input name="country" placeholder="Country"
          value={formData.country}
          onChange={handleChange} required />

        <input name="continent" placeholder="Continent"
          value={formData.continent}
          onChange={handleChange} />

        <input name="bestTimeToVisit" placeholder="Best Time"
          value={formData.bestTimeToVisit}
          onChange={handleChange} />

        <input name="estimatedBudgetUSD" type="number"
          placeholder="Budget"
          value={formData.estimatedBudgetUSD}
          onChange={handleChange} />

        <input name="famousFor"
          placeholder="Famous For (comma separated)"
          value={formData.famousFor}
          onChange={handleChange} />

        <input name="activities"
          placeholder="Activities (comma separated)"
          value={formData.activities}
          onChange={handleChange} />

        <label>
          Visa Required
          <input type="checkbox"
            name="isVisaRequired"
            checked={formData.isVisaRequired}
            onChange={handleChange} />
        </label>

        <br /><br />
        <button type="submit">
          {editingId ? "Update Vibe" : "Add Vibe"}
        </button>
      </form>

      <hr />

      {/* LIST */}
      {vibes.map((vibe) => (
        <div key={vibe._id} style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "8px"
        }}>
          <h2>{vibe.destination}</h2>
          <p><b>Country:</b> {vibe.country}</p>
          <p><b>Continent:</b> {vibe.continent}</p>
          <p><b>Best Time:</b> {vibe.bestTimeToVisit}</p>
          <p><b>Budget:</b> ${vibe.estimatedBudgetUSD}</p>
          <p><b>Visa Required:</b> {vibe.isVisaRequired ? "Yes" : "No"}</p>

          {vibe.famousFor?.length > 0 && (
            <>
              <b>Famous For:</b>
              <ul>
                {vibe.famousFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {vibe.activities?.length > 0 && (
            <>
              <b>Activities:</b>
              <ul>
                {vibe.activities.map((act) => (
                  <li key={act}>{act}</li>
                ))}
              </ul>
            </>
          )}

          <button onClick={() => handleEdit(vibe)}>Edit</button>
          <button onClick={() => handleDelete(vibe._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;