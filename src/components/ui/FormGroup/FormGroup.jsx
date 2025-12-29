

import './FormGroup.css';


export const FormGroup = ({className = '', children, ...rest}) =>{
    return (
        <div {...rest} className={`form-group ${className}`}>
            {children}
        </div>
    );
}