import React from 'react';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import {DraggableCard} from '../Card';
import {usePermissions} from '../../../contexts';

export const SortableColumn = ({
    column,
    onCardClick,
    onAddCard,
    onEditColumn,
    dragOverTaskId,
}) => {
    const permissions = usePermissions();
    const sortedTasks = [...column.tasks].sort((a, b) => a.order - b.order);
    const taskIds = sortedTasks.map(task => task.id);
    
    const {
        setNodeRef,
        isOver
    } = useDroppable({
        id: column.id,
    });

    return (
        <div 
            ref={setNodeRef} 
            className={`column ${isOver ? 'drag-over' : ''}`}
        >
            <div className="column-header">
                <h2 className="column-title">{column.title}</h2>
                {onEditColumn && (
                    <button className="column-menu-btn" onClick={onEditColumn}>
                        <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </button>
                )}
            </div>
            
            <div className="column-content">
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {/* Show drop indicator at top if dragging over empty column */}
                    {isOver && sortedTasks.length === 0 && (
                        <div className="drop-zone-placeholder"></div>
                    )}
                    
                    {sortedTasks.map((task, index) => (
                        <React.Fragment key={task.id}>
                            {/* Show drop indicator above current task if dragging over it */}
                            {dragOverTaskId === task.id && (
                                <div className="drop-zone-indicator"></div>
                            )}
                            
                            <DraggableCard
                                task={task}
                                onClick={() => onCardClick(task)}
                                canDrag={permissions.canEdit}
                            />
                            
                            {/* Show drop indicator at bottom if this is the last task and we're dragging over the column */}
                            {isOver && index === sortedTasks.length - 1 && !dragOverTaskId && (
                                <div className="drop-zone-indicator"></div>
                            )}
                        </React.Fragment>
                    ))}
                </SortableContext>
            </div>

            {onAddCard && permissions.canEdit && (
                <button className="add-card-btn" onClick={onAddCard}>
                    <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add another card</span>
                </button>
            )}
        </div>
    );
};