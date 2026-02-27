import { useState, useEffect } from "react";
import travelData from "../data/travel.json";
import "../styles/dashboard.css";

function Dashboard({ setIsLoggedIn }) {

  // ================= INITIAL STATE =================
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem("destinations");
    if (saved) return JSON.parse(saved);
    return travelData?.dreamTravelDestinations || [];
  });

  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);

  const [newItem, setNewItem] = useState({
    destination: "",
    country: "",
    famousFor: "",
    bestTimeToVisit: "",
  });

  // ================= SYNC LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }, [destinations]);

  // ================= ADD =================
  const handleAdd = () => {
    if (!newItem.destination.trim() || !newItem.country.trim()) return;

    const newDestination = {
      id: Date.now(),  // unique key
      destination: newItem.destination,
      country: newItem.country,
      famousFor: newItem.famousFor
        ? newItem.famousFor.split(",").map(item => item.trim())
        : [],
      bestTimeToVisit: newItem.bestTimeToVisit,
    };

    setDestinations([...destinations, newDestination]);

    setNewItem({
      destination: "",
      country: "",
      famousFor: "",
      bestTimeToVisit: "",
    });
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  // ================= SAVE EDIT =================
  const handleSave = () => {
    if (!editItem.destination.trim() || !editItem.country.trim()) return;

    const updated = destinations.map((d) =>
      d.id === editItem.id
        ? {
            ...editItem,
            famousFor: Array.isArray(editItem.famousFor)
              ? editItem.famousFor
              : editItem.famousFor.split(",").map(item => item.trim()),
          }
        : d
    );

    setDestinations(updated);
    setEditItem(null);
  };

  // ================= SEARCH FILTER =================
  const filtered = destinations.filter((d) =>
    d.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <h1>🌍 Exploring New Vibes</h1>
        <button
          className="logout-btn"
          onClick={() => setIsLoggedIn(false)}
        >
          🚪 Logout
        </button>
      </header>

      {/* ================= ADD FORM ================= */}
      <div className="add-box">
        <input
          placeholder="Destination"
          value={newItem.destination}
          onChange={(e) =>
            setNewItem({ ...newItem, destination: e.target.value })
          }
        />

        <input
          placeholder="Country"
          value={newItem.country}
          onChange={(e) =>
            setNewItem({ ...newItem, country: e.target.value })
          }
        />

        <input
          placeholder="Famous For (comma separated)"
          value={newItem.famousFor}
          onChange={(e) =>
            setNewItem({ ...newItem, famousFor: e.target.value })
          }
        />

        <input
          placeholder="Best Time To Visit"
          value={newItem.bestTimeToVisit}
          onChange={(e) =>
            setNewItem({ ...newItem, bestTimeToVisit: e.target.value })
          }
        />

        <button onClick={handleAdd}>➕ Add Destination</button>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        className="search-box"
        placeholder="🔍 Search destination..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ================= DISPLAY ================= */}
      <div className="destinations-grid">
        {filtered.map((place) => (
          <div className="destination-card" key={place.id}>
            <h2>{place.destination}</h2>
            <p><b>Country:</b> {place.country}</p>
            <p>
              <b>Famous For:</b>{" "}
              {Array.isArray(place.famousFor)
                ? place.famousFor.join(", ")
                : place.famousFor}
            </p>
            <p><b>Best Time:</b> {place.bestTimeToVisit}</p>

            <div className="actions">
              <button
                className="edit-btn"
                onClick={() => setEditItem({ ...place })}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(place.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Destination</h3>

            <input
              value={editItem.destination}
              onChange={(e) =>
                setEditItem({ ...editItem, destination: e.target.value })
              }
            />

            <input
              value={editItem.country}
              onChange={(e) =>
                setEditItem({ ...editItem, country: e.target.value })
              }
            />

            <input
              value={
                Array.isArray(editItem.famousFor)
                  ? editItem.famousFor.join(", ")
                  : editItem.famousFor
              }
              onChange={(e) =>
                setEditItem({ ...editItem, famousFor: e.target.value })
              }
            />

            <input
              value={editItem.bestTimeToVisit}
              onChange={(e) =>
                setEditItem({ ...editItem, bestTimeToVisit: e.target.value })
              }
            />

            <button className="edit-btn" onClick={handleSave}>
              💾 Save
            </button>

            <button
              className="delete-btn"
              onClick={() => setEditItem(null)}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;