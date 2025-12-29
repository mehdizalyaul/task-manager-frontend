import React from 'react';
import {MoreHorizontal, Plus} from 'lucide-react';
import {useCanEdit} from '../../../contexts';

import './Column.css';

export const Column = ({title, children, onAddCard, onEditColumn}) => {
    const canEdit = useCanEdit();

    return (
        <div className="column">
            <div className="column-header">
                <h2 className="column-title">{title}</h2>
                {canEdit && (
                    <button className="column-menu-btn" onClick={onEditColumn}>
                        <MoreHorizontal className="icon"/>
                    </button>
                )}
            </div>

            <div className="column-content">
                {children}
            </div>

            {canEdit && (
                <button className="add-card-btn" onClick={onAddCard}>
                    <Plus className="icon"/>
                    <span>Add another card</span>
                </button>
            )}
        </div>
    );
};
