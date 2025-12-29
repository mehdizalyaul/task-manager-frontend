import {useContext} from "react";
import {TagContext} from "./context";

export function useTags() {
    return useContext(TagContext);
}