import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHashId, navigateToHomeSection } from '../utils/homeNavigation';

const HashLink = ({ to, children, className, onClick, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionId = getHashId(to);

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.(e);
    navigateToHomeSection(navigate, location, sectionId);
  };

  return (
    <a href={sectionId ? `/#${sectionId}` : to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default HashLink;
