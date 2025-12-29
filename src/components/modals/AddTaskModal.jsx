import React, {useState} from 'react';
import {Button, Modal, FormGroup, ModalFooter, Label, TextField, Select, MultiSelect} from '../ui';

import { useBoards, useTags } from '../../contexts';

export const AddTaskModal = ({onSave, onClose, columnTitle}) => {
    const { currentBoardData } = useBoards();
    const members = currentBoardData?.members || [];
    const { tags } = useTags();
    
    const [formData, setFormData] = useState({
        title: '',
        selectedTags: [],
        date: '',
        assignee: '',
        emoji: '',
        priority: 'Medium'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleTagsChange = (selectedTags) => {
        setFormData(prev => ({...prev, selectedTags}));
    };

    const handleSave = () => {
        if (!formData.title.trim()) return;
        
        onSave({
            title: formData.title,
            tags: formData.selectedTags,
            date: formData.date,
            assignee: formData.assignee,
            emoji: formData.emoji,
            priority: formData.priority
        });
    }

    return (
        <Modal isOpen={true} onClose={onClose} title={`Add Card to ${columnTitle}`}>
            <FormGroup>
                <Label>Title</Label>
                <TextField
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter card title..."
                />
            </FormGroup>

            <FormGroup>
                <Label>Tags</Label>
                <MultiSelect
                    options={tags}
                    selectedValues={formData.selectedTags}
                    onChange={handleTagsChange}
                    placeholder="Select tags..."
                />
            </FormGroup>

            <div className="form-row">
                <FormGroup>
                    <Label>Priority</Label>
                    <Select
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                    </Select>
                </FormGroup>
                
                <FormGroup>
                    <Label>Emoji (optional)</Label>
                    <TextField
                        type="text"
                        value={formData.emoji}
                        onChange={(e) => handleChange('emoji', e.target.value)}
                        placeholder="😊"
                        maxLength={2}
                    />
                </FormGroup>
            </div>

            <div className="form-row">
                <FormGroup>
                    <Label>Due Date</Label>
                    <TextField
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Assign To</Label>
                    <Select
                        value={formData.assignee}
                        onChange={(e) => handleChange('assignee', e.target.value)}
                    >
                        <option value="">Unassigned</option>
                        {
                            members.map(member => (
                                <option key={member.id} value={member.avatar}>{member.name}</option>
                            ))
                        }
                    </Select>
                </FormGroup>
            </div>

            <ModalFooter>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={!formData.title.trim()}>Add Card</Button>
            </ModalFooter>
        </Modal>
    );
};