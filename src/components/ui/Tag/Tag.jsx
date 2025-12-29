import React from 'react';

import './Tag.css';


export const Tag = ({ children, color = 'blue', size = 'md' }) => {
  return (
    <span className={`tag tag-${color} tag-${size}`}>
      {children}
    </span>
  );
};
