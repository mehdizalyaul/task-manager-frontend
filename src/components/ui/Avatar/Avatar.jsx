import React from 'react';

import './Avatar.css';


export const Avatar = ({src, alt, size = 'sm'}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`avatar avatar-${size}`}
        />
    );
};
