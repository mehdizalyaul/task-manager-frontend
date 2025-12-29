

import './IconButton.css';

export const IconButton = ({onClick, size = 'md', children}) => {
    return (
        <button className={`icon-btn icon-btn-${size}`} onClick={onClick}>
            {children}
        </button>
    )
}