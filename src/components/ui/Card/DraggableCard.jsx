import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Card} from './Card';

export const DraggableCard = ({task, onClick, canDrag = true}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        disabled: !canDrag
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        cursor: canDrag ? 'pointer' : 'default',
        zIndex: isDragging ? 1000 : 'auto',
    };

    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState({ x: 0, y: 0 });
    const [hasDragStarted, setHasDragStarted] = React.useState(false);
    const dragThreshold = 5; // pixels

    // Handle mouse events globally to track mouse movement outside the card
    React.useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (!canDrag || !isMouseDown) return;

            const deltaX = Math.abs(e.clientX - startPosition.x);
            const deltaY = Math.abs(e.clientY - startPosition.y);
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > dragThreshold && !hasDragStarted) {
                setHasDragStarted(true);
            }
        };

        const handleGlobalMouseUp = () => {
            if (!canDrag) return;

            const wasMouseDown = isMouseDown;
            const hadDragStarted = hasDragStarted;

            setIsMouseDown(false);
            setHasDragStarted(false);
            
            // If we haven't moved enough to start dragging, treat it as a click
            if (wasMouseDown && !hadDragStarted && !isDragging) {
                onClick();
            }
        };

        if (isMouseDown) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isMouseDown, startPosition, hasDragStarted, isDragging, canDrag, onClick]);

    const handleMouseDown = (e) => {
        if (!canDrag) {
            onClick();
            return;
        }
        
        setIsMouseDown(true);
        setStartPosition({ x: e.clientX, y: e.clientY });
        setHasDragStarted(false);
        
        // Call the original listener
        listeners?.onMouseDown?.(e);
    };

    const handleClick = (e) => {
        if (!canDrag) {
            // For viewers, handle click directly
            onClick();
            return;
        }
        
        // For draggable cards, prevent default since we handle clicks in mouse events
        e.preventDefault();
        e.stopPropagation();
    };

    const dragHandlers = canDrag ? {
        ...listeners,
        onMouseDown: handleMouseDown,
    } : {};

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${isDragging ? 'dragging-card' : ''} ${!canDrag ? 'non-draggable' : ''}`}
            {...(canDrag ? attributes : {})}
            {...dragHandlers}
            onClick={handleClick}
        >
            <Card
                tags={task.tags}
                title={task.title}
                date={task.date}
                assignee={task.assignee || undefined}
                emoji={task.emoji}
                priority={task.priority}
                onClick={() => {}} // Disable Card's own onClick to prevent event bubbling
            />
        </div>
    );
};