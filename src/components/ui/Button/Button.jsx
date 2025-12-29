import './Button.css';

export const Button = ({className = '', variant = 'primary', size = 'md', children, ...rest}) => {
    return (
        <button {...rest} className={`btn btn-${variant} btn-${size} ${className}`}>
            {children}
        </button>
    )
}

