import {useContext} from "react";
import {TasksContext} from "./context";

export function useTasksContext() {
    return useContext(TasksContext);
}