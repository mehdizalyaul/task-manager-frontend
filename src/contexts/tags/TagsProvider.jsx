import {useMemo} from "react";
import {TagContext} from "./context";
import {useBoards} from "../boards";


export const TagsProvider = ({children}) => {
    const { currentBoardId, currentBoardData, updateBoardData } = useBoards();

    // Get current board's tags
    const tags = currentBoardData?.tags || [];

    const addTag = useCallback((tag) => {
        if (!currentBoardId) return;
        
        const newTag = {
            ...tag,
            id: `tag-${Date.now()}`
        };
        
        const updatedTags = [...tags, newTag];
        updateBoardData({ tags: updatedTags });
    }, [currentBoardId, tags, updateBoardData]);

    const updateTag = useCallback((tagId, updates) => {
        if (!currentBoardId) return;
        
        const updatedTags = tags.map(tag => 
            tag.id === tagId ? { ...tag, ...updates } : tag
        );
        
        updateBoardData({ tags: updatedTags });
    }, [currentBoardId, tags, updateBoardData]);

    const deleteTag = useCallback((tagId) => {
        if (!currentBoardId) return;
        
        const updatedTags = tags.filter(tag => tag.id !== tagId);
        updateBoardData({ tags: updatedTags });
    }, [currentBoardId, tags, updateBoardData]);

    const value = useMemo(() => ({
        tags,
        addTag,
        updateTag,
        deleteTag
    }), [tags, addTag, updateTag, deleteTag]);

    return (
        <TagContext.Provider value={value}>
            {children}
        </TagContext.Provider>
    );
};