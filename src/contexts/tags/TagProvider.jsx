import { useState, useCallback, useMemo } from "react";
import { TagContext } from "./context.js";

const defaultTags = [
    { id: '1', name: 'Design system', color: 'blue' },
    { id: '2', name: 'Epic work', color: 'yellow' },
    { id: '3', name: 'Design issue', color: 'red' },
    { id: '4', name: 'Investor deck', color: 'green' },
    { id: '5', name: 'Marketing', color: 'blue' },
    { id: '6', name: 'Bug fix', color: 'red' },
];

export const TagProvider = ({ children }) => {
    const [tags, setTags] = useState(defaultTags);

    const addTag = useCallback((newTag) => {
        const tagId = Date.now().toString();
        const fullTag = { ...newTag, id: tagId };
        setTags(prev => [...prev, fullTag]);
    }, []);

    const updateTag = useCallback((tagId, updates) => {
        setTags(prev => prev.map(tag => 
            tag.id === tagId ? { ...tag, ...updates } : tag
        ));
    }, []);

    const deleteTag = useCallback((tagId) => {
        setTags(prev => prev.filter(tag => tag.id !== tagId));
    }, []);

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