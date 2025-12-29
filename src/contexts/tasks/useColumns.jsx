import {useContext} from "react";
import {TasksContext} from "./context";

export function useColumns() {
    return useContext(TasksContext).columns;
}