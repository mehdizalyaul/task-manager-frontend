import {createContext} from "react";

export const TasksContext = createContext({
    columns: [],
    updateTask: () => {},
    addTask: () => {},
    addColumn: () => {},
    updateColumn: () => {},
    deleteColumn: () => {},
    reorderTasks: () => {},
    moveTaskBetweenColumns: () => {}
});