import React from "react";
import UrgentIcon from "../assets/SVG - Urgent Priority grey.svg";
import HighIcon from "../assets/Img - High Priority.svg";
import MediumIcon from "../assets/Img - Medium Priority.svg";
import LowIcon from "../assets/Img - Low Priority.svg";
import NoPriorityIcon from "../assets/No-priority.svg"; 
import GreyDotIcon from "../assets/Grey-dot.svg"; 
import "./TicketCard.css";

function TicketCard({ ticket, users, groupBy }) {
  const assignedUser = users.find((user) => user.id === ticket.userId);

  // Function to return priority icon based on priority level
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return <img src={UrgentIcon} alt="Urgent" className="priority-icon" />;
      case 3:
        return <img src={HighIcon} alt="High" className="priority-icon" />;
      case 2:
        return <img src={MediumIcon} alt="Medium" className="priority-icon" />;
      case 1:
        return <img src={LowIcon} alt="Low" className="priority-icon" />;
      case 0:
        return <img src={NoPriorityIcon} alt="No Priority" className="priority-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {/* Only show the user icon if groupBy is not "userId" */}
        {groupBy !== "userId" && (
          <span className="user-icon">{assignedUser?.name.charAt(0) || "U"}</span>
        )}
      </div>
      <h4 className="ticket-title">{ticket.title}</h4>
      <div className="priority-section">
        {getPriorityIcon(ticket.priority)}
        <span className="feature-request">
          <img src={GreyDotIcon} alt="Feature dot" className="grey-dot" />
          Feature Request
        </span>
      </div>
    </div>
  );
}

export default TicketCard;
