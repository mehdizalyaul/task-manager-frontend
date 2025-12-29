import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Tag } from '../Tag';


import './MultiSelect.css';

export const MultiSelect = ({
    options,
    selectedValues,
    onChange,
    placeholder = "Select tags...",
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const availableOptions = options.filter(option => 
        !selectedValues.some(selected => selected.id === option.id)
    );

    const handleToggleOption = (option) => {
        const isSelected = selectedValues.some(selected => selected.id === option.id);
        
        if (isSelected) {
            onChange(selectedValues.filter(selected => selected.id !== option.id));
        } else {
            onChange([...selectedValues, option]);
        }
    };

    const handleRemoveTag = (tagId, event) => {
        event.stopPropagation();
        onChange(selectedValues.filter(selected => selected.id !== tagId));
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="multi-select" ref={containerRef}>
            <div 
                className={`multi-select-trigger ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="multi-select-content">
                    {selectedValues.length === 0 ? (
                        <span className="multi-select-placeholder">{placeholder}</span>
                    ) : (
                        <div className="multi-select-tags">
                            {selectedValues.map(tag => (
                                <div key={tag.id} className="multi-select-tag">
                                    <Tag color={tag.color} size="sm">
                                        {tag.name}
                                        <button
                                            type="button"
                                            className="multi-select-tag-remove"
                                            onClick={(e) => handleRemoveTag(tag.id, e)}
                                        >
                                            <X size={12} />
                                        </button>
                                    </Tag>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <ChevronDown className={`multi-select-arrow ${isOpen ? 'rotated' : ''}`} />
            </div>

            {isOpen && !disabled && (
                <div className="multi-select-dropdown">
                    {availableOptions.length === 0 ? (
                        <div className="multi-select-empty">
                            {options.length === 0 ? 'No tags available' : 'All tags selected'}
                        </div>
                    ) : (
                        availableOptions.map(option => (
                            <div
                                key={option.id}
                                className="multi-select-option"
                                onClick={() => handleToggleOption(option)}
                            >
                                <Tag color={option.color} size="sm">
                                    {option.name}
                                </Tag>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};