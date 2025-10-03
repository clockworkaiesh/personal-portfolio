'use client';

import Dock from './Dock';
import { RiHome9Line, RiRobot3Line, RiToolsLine, RiCodeSSlashLine, RiMailUnreadLine} from "react-icons/ri";

export default function WebMenu({ onItemClick }) {
  const items = [
    { 
      icon:  <RiHome9Line size={21}/>
      , 
      label: 'Home', 
      onClick: () => onItemClick && onItemClick(0) // Hero section
    },
    { 
      icon: <RiRobot3Line size={21} />, 
      label: 'About', 
      onClick: () => onItemClick && onItemClick(1) // About section
    },
    { 
      icon: <RiToolsLine  size={23} />, 
      label: 'Work', 
      onClick: () => onItemClick && onItemClick(2) // Work section
    },
    { 
      icon: <RiCodeSSlashLine  size={21} />, 
      label: 'Skills', 
      onClick: () => onItemClick && onItemClick(3) // Skills section
    },
    { 
      icon: <RiMailUnreadLine  size={21} />, 
      label: 'Contact', 
      onClick: () => onItemClick && onItemClick(4) // Contact section
    },
  ];

  return (
    <Dock 
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
      className="bg-dark-default/20 backdrop-blur-md"
    />
  );
}
