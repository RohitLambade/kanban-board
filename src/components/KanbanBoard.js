import React from "react";
import TicketCard from "./TicketCard";
import TodoIcon from "../assets/To-do.svg";        
import InProgressIcon from "../assets/in-progress.svg";
import DoneIcon from "../assets/Done.svg";
import BacklogIcon from "../assets/Backlog.svg";
import CancelledIcon from "../assets/Cancelled.svg";
import UrgentIcon from "../assets/SVG - Urgent Priority colour.svg";
import HighIcon from "../assets/Img - High Priority.svg";
import MediumIcon from "../assets/Img - Medium Priority.svg";
import LowIcon from "../assets/Img - Low Priority.svg";
import NoPriorityIcon from "../assets/No-priority.svg";
import ThreeDotIcon from "../assets/3 dot menu.svg"; 
import AddIcon from "../assets/add.svg"; 
import "./KanbanBoard.css";

function KanbanBoard({ tickets, users, groupBy, sortBy }) {
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Status categories
  const statusCategories = [
    { name: "Backlog", icon: BacklogIcon },
    { name: "Todo", icon: TodoIcon },
    { name: "In progress", icon: InProgressIcon },
    { name: "Done", icon: DoneIcon },
    { name: "Cancelled", icon: CancelledIcon },
  ];

  // Priority categories with icons
  const priorityCategories = [
    { name: "No Priority", priority: 0, icon: NoPriorityIcon },
    { name: "Urgent", priority: 4, icon: UrgentIcon },
    { name: "High", priority: 3, icon: HighIcon },
    { name: "Medium", priority: 2, icon: MediumIcon },
    { name: "Low", priority: 1, icon: LowIcon }
    
  ];


  // Group tickets by status, user, or priority
  const groupTickets = (tickets) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      let key;
      if (groupBy === "status") {
        key = ticket.status;
      } else if (groupBy === "userId") {
        key = ticket.userId;
      } else if (groupBy === "priority") {
        key = ticket.priority;
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });
    return grouped;
  };

  const groupedTickets = groupTickets(sortedTickets);

  return (
    <div className="kanban-board">
      {/* Group by Status */}
      {groupBy === "status" &&
        statusCategories.map((status) => (
          <div key={status.name} className="kanban-column">
            <div className="kanban-header">
              <h3>
                <img src={status.icon} alt={`${status.name} icon`} className="status-icon" />
                {status.name}&nbsp;&nbsp;
                <span className="ticket-count">{groupedTickets[status.name]?.length || 0}</span>
                
                  <img src={ThreeDotIcon} alt="3-Dot Icon" className="three-dot-icon" />
                  <img src={AddIcon} alt="Add Icon" className="add-icon" />
                
              </h3>
            </div>
            {groupedTickets[status.name]?.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
            )) || <p>No tickets</p>}
          </div>
        ))}

      {/* Group by User */}
      {groupBy === "userId" &&
        users.map((user) => (
          <div key={user.id} className="kanban-column">
            <div className="kanban-header">
            <h3>
                <span className="user-icon-header">{user.name.charAt(0)}</span>
                
                  {user.name}&nbsp;&nbsp;
                  <span className="ticket-count">{groupedTickets[user.id]?.length || 0}</span>
                  
                    <img src={ThreeDotIcon} alt="3-Dot Icon" className="three-dot-icon" />
                    <img src={AddIcon} alt="Add Icon" className="add-icon" />
                  
                </h3>
              </div>
            {groupedTickets[user.id]?.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
            )) || <p>No tickets assigned</p>}
          </div>
        ))}

      {/* Group by Priority */}
      {groupBy === "priority" &&
        priorityCategories.map((priority) => (
          <div key={priority.priority} className="kanban-column">
            <div className="kanban-header">
              <h3>
              <img src={priority.icon} alt={`${priority.name} icon`} className="priority-icon" />
              {priority.name}&nbsp;&nbsp;
                <span className="ticket-count">{groupedTickets[priority.priority]?.length || 0}</span>
                
                  <img src={ThreeDotIcon} alt="3-Dot Icon" className="three-dot-icon" />
                  <img src={AddIcon} alt="Add Icon" className="add-icon" />
                
              </h3>
            </div>
            {groupedTickets[priority.priority]?.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
            )) || <p>No tickets</p>}
          </div>
        ))}
    </div>
  );
}

export default KanbanBoard;
