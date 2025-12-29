import React from 'react';
import { Plus } from 'lucide-react';
import './Column.css';

export const AddColumn = ({ onClick }) => {
  return (
    <div className="column add-column" onClick={onClick}>
      <div className="add-column-content">
        <Plus className="icon" />
        <span>Add another list</span>
      </div>
    </div>
  );
};