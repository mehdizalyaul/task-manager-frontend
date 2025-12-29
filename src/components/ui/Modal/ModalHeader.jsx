import React from "react";
import {X} from "lucide-react";

export const ModalHeader= ({title, onClose}) => {
    return (
        <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="modal-close-btn" onClick={onClose}>
                <X className="icon"/>
            </button>
        </div>
    );
}