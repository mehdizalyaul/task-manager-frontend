import React from 'react';
import {Plus, Shield, User, Eye} from 'lucide-react';
import {Avatar, Button, Modal, ModalFooter} from '../ui';
import {useBoards, useCanManage, useAuth} from '../../contexts';


import './MembersModal.css';


export const MembersModal = ({onClose}) => {
    const {user} = useAuth();
    const {currentBoardData} = useBoards();
    const members = currentBoardData?.members || [];
    const canManage = useCanManage();

    const getRoleIcon = (role) => {
        switch (role) {
            case 'Admin':
                return <Shield className="role-icon admin"/>;
            case 'Member':
                return <User className="role-icon member"/>;
            case 'Viewer':
                return <Eye className="role-icon viewer"/>;
            default:
                return <User className="role-icon member"/>;
        }
    };

    const getRoleDescription = (role) => {
        switch (role) {
            case 'Admin':
                return 'Full access to board settings and member management';
            case 'Member':
                return 'Can create and edit tasks and columns';
            case 'Viewer':
                return 'Can only view board content';
            default:
                return '';
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Board Members">
            <div className="members-modal-content">
                <div className="members-list">
                    {members.map(member => {
                        const isCurrentUser = member.id === user?.id;
                        return (
                            <div key={member.id} className="member-item">
                                <div className="member-main-info">
                                    <Avatar src={member.avatar} alt={member.name} size="md"/>
                                    <div className="member-details">
                                        <div className="member-name-row">
                                            <span className="member-name">
                                                {member.name}
                                                {isCurrentUser && <span className="current-user-label"> (You)</span>}
                                            </span>
                                        </div>
                                        <div className="member-role-info">
                                            <div className="role-badge">
                                                {getRoleIcon(member.role)}
                                                <span className="role-text">{member.role}</span>
                                            </div>
                                            <span className="role-description">
                                                {getRoleDescription(member.role)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {
                    /*
                    canManage && (
                    <div className="members-actions">
                        <Button variant="secondary" size="sm">
                            <Plus className="icon-sm"/>
                            Invite Member
                        </Button>
                    </div>
                )
                     */
                }
            </div>

            <ModalFooter>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};