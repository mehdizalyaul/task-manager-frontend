export const AvatarGroup = ({children, className = '', onClick, ...rest}) => {
    return (
        <div 
            {...rest}
            className={`avatar-group ${onClick ? 'avatar-group-clickable' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

