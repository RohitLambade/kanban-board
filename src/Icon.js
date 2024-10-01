import React from 'react';

const Icon = ({ type }) => {
  let iconPath = '';
  switch (type) {
    case '4':
      iconPath = `${process.env.PUBLIC_URL}/icons/SVG - Urgent Priority grey.svg`;
      break;
    case '3':
      iconPath = `${process.env.PUBLIC_URL}/icons/Img - High Priority.svg`;
      break;
    case '2':
      iconPath = `${process.env.PUBLIC_URL}/icons/Img - Medium Priority.svg`;
      break;
    case '1':
      iconPath = `${process.env.PUBLIC_URL}/icons/Img - Low Priority.svg`;
      break;
    case '0':
      iconPath = `${process.env.PUBLIC_URL}/icons/No-priority.svg`;
      break;
    case 'Todo':
      iconPath = `${process.env.PUBLIC_URL}/icons/To-do.svg`;
      break;
    case 'In progress':
      iconPath = `${process.env.PUBLIC_URL}/icons/in-progress.svg`;
      break;
    case 'Done':
      iconPath = `${process.env.PUBLIC_URL}/icons/Done.svg`;
      break;
    case 'Backlog':
      iconPath = `${process.env.PUBLIC_URL}/icons/Backlog.svg`;
      break;
    default:
      iconPath = `${process.env.PUBLIC_URL}/icons/3 dot menu.svg`; // default icon
      break;
  }
  return <img src={iconPath} alt={`${type} icon`} />;
};

export default Icon;
