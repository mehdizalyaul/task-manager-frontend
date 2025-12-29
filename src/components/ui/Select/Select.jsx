

import './Select.css';

export const Select = ({
    className = '', 
    size = 'md', 
    variant = 'default',
    children,
    ...rest
}) => {
    return (
        <select 
            {...rest} 
            className={`select select-${size} select-${variant} ${className}`}
        >
            {children}
        </select>
    )
}