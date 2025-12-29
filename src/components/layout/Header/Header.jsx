import React from 'react';
import {Star, Menu, User, Settings} from 'lucide-react';
import {Avatar, AvatarGroup, IconButton} from '../../ui';
import {
    useBoards,
    usePermissions,
    useAuth
} from "../../../contexts";

import './Header.css'


export const Header = ({
                                                  onMenuClick,
                                                  onProfileClick,
                                                  onSettingsClick,
                                                  onMembersClick
                                              }) => {

    const {currentBoard, currentBoardData, currentBoardId, toggleBoardFavorite, switchToBoard} = useBoards();
    const {user} = useAuth();
    const permissions = usePermissions();

    const members = currentBoardData?.members || [];

    const currentUserMember = members.find(member => member.id === user?.id);
    const userRole = currentUserMember?.role || 'Viewer';

    const isFavorite = currentBoard?.isStarred || false;

    const toggleFavorite = () => {
        if (currentBoardId) {
            toggleBoardFavorite(currentBoardId);
        }
    };

    const navigateToHome = () => {
        // Navigate to home by setting currentBoardId to null
        switchToBoard(null);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <button className="icon-btn menu-btn" onClick={onMenuClick}>
                        <Menu className="icon"/>
                    </button>
                    {
                        currentBoard && (
                            <>
                                <div className="board-info">
                                    <h1 className="board-title">{currentBoard?.name || 'No Board Selected'}</h1>
                                    <span className="user-role-badge">{userRole}</span>
                                </div>
                                <IconButton onClick={toggleFavorite}>
                                    <Star className={`icon-sm ${isFavorite && 'starred'}`}/>
                                </IconButton>
                            </>
                        )
                    }

                </div>

                <div className="header-center">
                    <div className="logo-container" onClick={navigateToHome} style={{cursor: 'pointer'}}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/200px-Trello_logo.svg.png"
                            alt="Trello"
                            className="logo"
                        />
                    </div>
                </div>

                <div className="header-right">
                    <AvatarGroup onClick={onMembersClick}>
                        {
                            members.map((member) => (
                                <Avatar
                                    key={member.id}
                                    src={member.avatar}
                                    alt={member.name}
                                    size="sm"
                                />
                            ))
                        }
                    </AvatarGroup>
                    <IconButton onClick={onProfileClick}>
                        <User/>
                    </IconButton>
                    {permissions.canChangeSettings && (
                        <IconButton onClick={onSettingsClick}>
                            <Settings/>
                        </IconButton>
                    )}
                </div>
            </div>
        </header>
    );
};
