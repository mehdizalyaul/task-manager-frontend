import React, {useState} from 'react';
import {Button, Modal, FormGroup, ModalFooter, Label, TextField, TextArea, Select, MultiSelect} from '../ui';

import { useBoards, useTags, usePermissions } from '../../contexts';

export const UpdateTaskModal = ({onSave, onClose, task, readOnly = false}) => {
    
    const { currentBoardData } = useBoards();
    const members = currentBoardData?.members || [];
    const { tags } = useTags();
    const permissions = usePermissions();
    
    const isReadOnly = readOnly || !permissions.canEdit;
    
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: '',
        priority: task?.priority || 'Medium',
        dueDate: task?.date || '',
        assignee: task?.assignee || '',
        emoji: task?.emoji || '',
        selectedTags: task?.tags || []
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleTagsChange = (selectedTags) => {
        setFormData(prev => ({...prev, selectedTags}));
    };

    const handleSave = () => {
        onSave({
            id: task.id,
            title: formData.title,
            tags: formData.selectedTags,
            date: formData.dueDate,
            assignee: formData.assignee,
            order: task.order,
            emoji: formData.emoji,
            priority: formData.priority
        });
    }

    return (
        <Modal isOpen={true} onClose={onClose} title="Task Details">
            <FormGroup>
                <Label>Title</Label>
                <TextField
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    disabled={isReadOnly}
                    readOnly={isReadOnly}
                />
            </FormGroup>

            <FormGroup>
                <Label>Description</Label>
                <TextArea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder={isReadOnly ? "" : "Add a more detailed description..."}
                    disabled={isReadOnly}
                    readOnly={isReadOnly}
                />
            </FormGroup>

            <FormGroup>
                <Label>Tags</Label>
                <MultiSelect
                    options={tags}
                    selectedValues={formData.selectedTags}
                    onChange={handleTagsChange}
                    placeholder={isReadOnly ? "" : "Select tags..."}
                    disabled={isReadOnly}
                />
            </FormGroup>

            <div className="form-row">
                {
                    /*
                     <FormGroup>
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option>Design tasks</option>
                        <option>In review</option>
                        <option>Ready for development</option>
                        <option>Ad-hoc projects</option>
                    </select>
                </FormGroup>
                     */
                }


                <FormGroup>
                    <Label>Priority</Label>
                    <Select
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        disabled={isReadOnly}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Emoji (optional)</Label>
                    <TextField
                        type="text"
                        value={formData.emoji}
                        onChange={(e) => handleChange('emoji', e.target.value)}
                        placeholder={isReadOnly ? "" : "😊"}
                        maxLength={2}
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                </FormGroup>
            </div>

            <div className="form-row">
                <FormGroup>
                    <Label>Due Date</Label>
                    <TextField
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleChange('dueDate', e.target.value)}
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Assign To</Label>
                    <Select
                        value={formData.assignee}
                        onChange={(e) => handleChange('assignee', e.target.value)}
                        disabled={isReadOnly}
                    >
                        <option value="">Unassigned</option>
                        {
                            members.map(member => (
                                <option key={member.id} value={member.name}>{member.name}</option>
                            ))
                        }
                    </Select>
                </FormGroup>
            </div>

            <ModalFooter>
                <Button variant="secondary" onClick={onClose}>{isReadOnly ? 'Close' : 'Cancel'}</Button>
                {!isReadOnly && (
                    <Button onClick={handleSave}>Save Changes</Button>
                )}
            </ModalFooter>
        </Modal>
    );
};  
