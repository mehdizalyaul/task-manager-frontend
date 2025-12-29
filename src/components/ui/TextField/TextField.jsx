

import './TextField.css';

export const TextField = ({
    className = '', 
    variant = 'default',
    ...rest
}) => {
    return (
        <input 
            {...rest} 
            className={`text-field text-field-${variant} ${className}`}
        />
    )
}