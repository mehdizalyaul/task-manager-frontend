import React, {useState} from 'react';
import {Button, FormGroup, Modal, ModalFooter, Label, TextField} from '../ui';
import {useAuth} from '../../contexts';


export const ProfileModal = ({onClose}) => {
    const {user, updateUser} = useAuth();
    const [profile, setProfile] = useState({
        name: user.name,
        email: user.email,
        role: user.role || '',
        department: user.department || ''
    });

    const handleSave = () => {
        updateUser({
            name: profile.name,
            email: profile.email,
            role: profile.role,
            department: profile.department
        });

        onClose();
    };

    const handleCancel = () => {
        setProfile({
            name: user.name,
            email: user.email,
            role: user.role || '',
            department: user.department || ''
        });
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Profile Settings">
            <div className="profile-section">
                {
                    /*
                    <div className="profile-avatar-section">
                        <Avatar src={user.avatar} alt="Profile" size="md"/>
                        <button className="btn btn-secondary btn-sm">Change Photo</button>
                    </div>
                     */
                }
                <FormGroup>
                    <Label>Full Name</Label>
                    <TextField
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <TextField
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Role</Label>
                    <TextField
                        type="text"
                        value={profile.role}
                        onChange={(e) => setProfile({...profile, role: e.target.value})}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Department</Label>
                    <TextField
                        type="text"
                        value={profile.department}
                        onChange={(e) => setProfile({...profile, department: e.target.value})}
                    />
                </FormGroup>

                <ModalFooter>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </ModalFooter>
            </div>
        </Modal>
    );
};
