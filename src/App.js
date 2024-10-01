import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import KanbanBoard from "./components/KanbanBoard";
import DisplayIcon from "./assets/Display.svg"; 
import DownIcon from "./assets/down.svg"; 
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState("priority");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Ref for dropdown element

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Toggle the dropdown visibility immediately without delay
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle selection and close dropdown
  const handleGroupByChange = (e) => {
    const newGroupBy = e.target.value;
    setGroupBy(newGroupBy);  
    localStorage.setItem('groupBy', newGroupBy);
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <header className="header">
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropbtn" onClick={toggleDropdown}>
            <img src={DisplayIcon} alt="Display Icon" className="icon-left" />
            Display
            <img src={DownIcon} alt="Down Icon" className="icon-right" />
          </button>
          {/* Toggle dropdown visibility */}
          {dropdownOpen && (
            <div className="dropdown-content">
              <div className="option-group">
                <label>Grouping</label>
                <select onChange={handleGroupByChange} value={groupBy}>
                  <option value="status">Status</option>
                  <option value="userId">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="option-sort">
                <label>Ordering</label>
                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
