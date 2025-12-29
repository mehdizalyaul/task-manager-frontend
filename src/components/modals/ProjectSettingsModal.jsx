import React, {useState} from 'react';
import {Plus, X} from 'lucide-react';
import {Avatar, Button, Modal, FormGroup, ModalFooter, Label, TextField, TextArea, Select} from '../ui';
import {useTags} from '../../contexts';


export const ProjectSettingsModal = ({
                                                                              onClose,
                                                                          }) => {
    const {tags, addTag, updateTag, deleteTag} = useTags();

    const [newTag, setNewTag] = useState({name: '', color: 'blue'});

    const [project, setProject] = useState({
        title: 'Design department',
        description: 'Central hub for all design-related tasks and projects'
    });

    const handleAddTag = () => {
        if (newTag.name.trim()) {
            addTag(newTag);
            setNewTag({name: '', color: 'blue'});
        }
    };

    const handleTagColorChange = (tagId, color) => {
        updateTag(tagId, {color});
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Project Settings">
            <FormGroup>
                <Label>Project Title</Label>
                <TextField
                    type="text"
                    value={project.title}
                    onChange={(e) => setProject({...project, title: e.target.value})}
                />
            </FormGroup>

            <FormGroup>
                <Label>Description</Label>
                <TextArea
                    rows={3}
                    value={project.description}
                    onChange={(e) => setProject({...project, description: e.target.value})}
                />
            </FormGroup>



            <FormGroup>
                <Label>Board Tags</Label>
                <div className="tags-list">
                    {tags.map(tag => (
                        <div key={tag.id} className="tag-item">
                            <div className="tag-info">
                                <span className={`tag tag-${tag.color}`}>{tag.name}</span>
                            </div>
                            <div className="tag-controls">
                                <Select
                                    size="sm"
                                    value={tag.color}
                                    onChange={(e) => handleTagColorChange(tag.id, e.target.value)}
                                >
                                    <option value="blue">Blue</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                </Select>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => deleteTag(tag.id)}
                                    style={{marginLeft: '8px'}}
                                >
                                    <X className="icon-sm"/>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="add-tag-section"
                     style={{marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'end'}}>
                    <FormGroup style={{flex: 1, marginBottom: 0}}>
                        <TextField
                            type="text"
                            placeholder="Tag name"
                            value={newTag.name}
                            onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup style={{marginBottom: 0}}>
                        <Select
                            value={newTag.color}
                            onChange={(e) => setNewTag({
                                ...newTag,
                                color: e.target.value
                            })}
                        >
                            <option value="blue">Blue</option>
                            <option value="yellow">Yellow</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                        </Select>
                    </FormGroup>
                    <Button onClick={handleAddTag} disabled={!newTag.name.trim()}>
                        <Plus className="icon-sm"/>
                        Add
                    </Button>
                </div>
            </FormGroup>

            <ModalFooter>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button>Save Changes</Button>
            </ModalFooter>
        </Modal>
    );
};
