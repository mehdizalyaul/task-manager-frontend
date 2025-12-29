import {useCallback, useMemo} from "react";
import {TasksContext} from "./context.js";
import {useBoards} from "../boards/index.js";

export const TasksProvider = ({children}) => {
    const {currentBoardId, currentBoardData, updateBoardData} = useBoards();

    const columns = useMemo(() => {
        return currentBoardData?.columns || [];
    }, [currentBoardData]);

    const updateTask = useCallback((updatedTask) => {
        if (!currentBoardId) return;

        const updatedColumns = columns.map((column) => {
            return {
                ...column,
                tasks: column.tasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            };
        });

        updateBoardData({columns: updatedColumns});
    }, [currentBoardId, columns, updateBoardData]);

    const addTask = useCallback((columnId, newTask) => {
        if (!currentBoardId) return;

        const taskId = Date.now().toString(); // Simple ID generation
        
        const updatedColumns = columns.map((column) => {
            if (column.id === columnId) {
                const nextOrder = Math.max(0, ...column.tasks.map(t => t.order)) + 1;
                const fullTask = {...newTask, id: taskId, order: nextOrder};
                return {
                    ...column,
                    tasks: [...column.tasks, fullTask]
                };
            }
            return column;
        });

        updateBoardData({columns: updatedColumns});
    }, [currentBoardId, columns, updateBoardData]);

    const addColumn = useCallback((name) => {
        if (!currentBoardId) return;

        const columnId = `column-${Date.now()}`;
        const newColumn = {
            id: columnId,
            title: name,
            tasks: []
        };

        const updatedColumns = [...columns, newColumn];
        updateBoardData({columns: updatedColumns});
    }, [currentBoardId, columns, updateBoardData]);

    const updateColumn = useCallback((columnId, name) => {
        if (!currentBoardId) return;

        const updatedColumns = columns.map((column) => {
            if (column.id === columnId) {
                return {...column, title: name};
            }
            return column;
        });

        updateBoardData({columns: updatedColumns});
    }, [currentBoardId, columns, updateBoardData]);

    const reorderTasks = useCallback((columnId, activeId, overId) => {
        if (!currentBoardId) return;

        const updatedColumns = columns.map((column) => {
            if (column.id !== columnId) return column;

            const oldIndex = column.tasks.findIndex(task => task.id === activeId);
            const newIndex = column.tasks.findIndex(task => task.id === overId);

            if (oldIndex === -1 || newIndex === -1) return column;

            const reorderedTasks = [...column.tasks];
            const [movedTask] = reorderedTasks.splice(oldIndex, 1);
            reorderedTasks.splice(newIndex, 0, movedTask);

            // Update order values
            const updatedTasks = reorderedTasks.map((task, index) => ({
                ...task,
                order: index
            }));

            return {
                ...column,
                tasks: updatedTasks
            };
        });

        updateBoardData({columns: updatedColumns});
    }, [currentBoardId, columns, updateBoardData]);

    const moveTaskBetweenColumns = useCallback((taskId, sourceColumnId, destColumnId, destIndex) => {
        if (!currentBoardId) return;

        const updatedColumns = columns.map((column) => {
            if (column.id === sourceColumnId) {
                // Remove task from source column
                const taskToMove = column.tasks.find(task => task.id === taskId);
                if (!taskToMove) return column;
                
                return {
                    ...column,
                    tasks: column.tasks.filter(task => task.id !== taskId)
                        .map((task, index) => ({...task, order: index}))
                };
            } else if (column.id === destColumnId) {
                // Add task to destination column
                const taskToMove = columns
                    .find(col => col.id === sourceColumnId)
                    ?.tasks.find(task => task.id === taskId);
                
                if (!taskToMove) return column;

                const newTasks = [...column.tasks];
                const insertIndex = Math.min(destIndex, newTasks.length);
                newTasks.splice(insertIndex, 0, {...taskToMove});
                
                return {
                    ...column,
                    tasks: newTasks.map((task, index) => ({...task, order: index}))
                };
            }
            return column;
        });

        updateBoardData({columns: updatedColumns});
    }, [currentBoardId, columns, updateBoardData]);

    const deleteColumn = useCallback((columnId) => {
        if (!currentBoardId) return;

        const updatedColumns = columns.filter((column) => column.id !== columnId);
        updateBoardData({columns: updatedColumns});
    }, [currentBoardId, columns, updateBoardData]);

    const value = useMemo(() => ({
        columns,
        updateTask,
        addTask,
        addColumn,
        updateColumn,
        deleteColumn,
        reorderTasks,
        moveTaskBetweenColumns,
    }), [columns, updateTask, addTask, addColumn, updateColumn, deleteColumn, reorderTasks, moveTaskBetweenColumns]);

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}