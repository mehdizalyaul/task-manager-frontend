

import './TextArea.css';

export const TextArea = ({
    className = '', 
    variant = 'default',
    resize = 'vertical',
    ...rest
}) => {
    return (
        <textarea 
            {...rest} 
            className={`text-area text-area-${variant} text-area-resize-${resize} ${className}`}
        />
    )
}