import React, {useState} from 'react';
import {Trash2} from 'lucide-react';
import {Modal, FormGroup, Label, TextField, Button, ModalFooter} from '../ui';


export const UpdateColumnModal = ({
                                                                        columnId,
                                                                        currentName,
                                                                        onClose,
                                                                        onSave,
                                                                        onDelete
                                                                    }) => {
    const [columnName, setColumnName] = useState(currentName);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSave = () => {
        if (columnName.trim() && columnName.trim() !== currentName) {
            onSave(columnId, columnName.trim());
        }
        onClose();
    };

    const handleDelete = () => {
        if (showDeleteConfirm) {
            onDelete(columnId);
            onClose();
        } else {
            setShowDeleteConfirm(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Edit Column">
            <FormGroup>
                <Label>Column Name</Label>
                <TextField
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter column name"
                    autoFocus
                />
            </FormGroup>

            <ModalFooter>
                <Button
                    variant="secondary"
                    onClick={handleDelete}
                    style={{
                        marginRight: 'auto',
                        backgroundColor: showDeleteConfirm ? '#dc3545' : undefined,
                        color: showDeleteConfirm ? 'white' : undefined
                    }}
                >
                    <Trash2 className="icon-sm"/>
                    {showDeleteConfirm ? 'Confirm Delete' : 'Delete Column'}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>
                    Save Changes
                </Button>
            </ModalFooter>
        </Modal>
    );
};