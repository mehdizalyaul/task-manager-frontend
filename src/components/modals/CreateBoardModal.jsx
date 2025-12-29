import React, {useState} from 'react';
import {Modal, FormGroup, Label, TextField, TextArea, Button, ModalFooter, Select} from '../ui';



export const CreateBoardModal = ({onClose, onSave}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        visibility: 'private',
    });


    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        if (!formData.name.trim()) return;

        onSave(formData);
        onClose();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && formData.name.trim()) {
            handleSave();
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Create Board">
            <FormGroup>
                <Label>Board Title</Label>
                <TextField
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter board title..."
                    autoFocus
                />
            </FormGroup>

            <FormGroup>
                <Label>Description (Optional)</Label>
                <TextArea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="What's this board about?"
                    rows={3}
                />
            </FormGroup>

            <div className="form-row">
                <FormGroup>
                    <Label>Visibility</Label>
                    <Select
                        value={formData.visibility}
                        onChange={(e) => handleChange('visibility', e.target.value)}
                    >
                        <option value="private">Private</option>
                        <option value="public">Team</option>
                    </Select>
                </FormGroup>
            </div>

            <ModalFooter>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!formData.name.trim()}>
                    Create Board
                </Button>
            </ModalFooter>
        </Modal>
    );
};