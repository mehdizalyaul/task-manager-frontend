import { useContext } from "react";
import { BoardContext } from "./context";

export function useBoards() {
    const context = useContext(BoardContext);
    
    if (!context) {
        throw new Error('useBoards must be used within BoardProvider');
    }
    
    return context;
}