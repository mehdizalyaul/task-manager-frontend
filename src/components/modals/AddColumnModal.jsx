import React, {useState} from 'react';
import {Modal, FormGroup, Label, TextField, Button, ModalFooter} from '../ui';

export const AddColumnModal = ({onClose, onSave}) => {
    const [columnName, setColumnName] = useState('');

    const handleSave = () => {
        if (columnName.trim()) {
            onSave(columnName.trim());
            onClose();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Add New Column">
            <FormGroup>
                <Label>Column Name</Label>
                <TextField
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter column name"
                    autoFocus
                />
            </FormGroup>

            <ModalFooter>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!columnName.trim()}>
                    Create Column
                </Button>
            </ModalFooter>
        </Modal>
    );
};