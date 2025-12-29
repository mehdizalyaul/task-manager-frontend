

import './Label.css';

export const Label = ({className = '', required = false, children, ...rest}) => {
    return (
        <label {...rest} className={`label ${className}`}>
            {children}
            {required && <span className="label-required">*</span>}
        </label>
    )
}