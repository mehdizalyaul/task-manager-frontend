import React from 'react';
import {X, Home, Lock, Users, Star, Plus} from 'lucide-react';
import {useBoards} from "../../../contexts";

import './Sidebar.css';

export const Sidebar = ({isOpen, onClose, onCreateBoard}) => {
    const {privateBoards, teamBoards, currentBoardId, switchToBoard} = useBoards();

    const handleBoardClick = (boardId) => {
        switchToBoard(boardId);
        onClose();
    };

    const handleCreateBoard = () => {
        onCreateBoard();
        onClose();
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen && 'active'}`} onClick={onClose}/>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Workspace</h2>
                    <button className="sidebar-close-btn" onClick={onClose}>
                        <X className="icon"/>
                    </button>
                </div>

                <div className="sidebar-content">
                    <button className="sidebar-nav-item active">
                        <Home className="icon-sm"/>
                        <span>Home</span>
                    </button>

                    <div className="sidebar-section">
                        <div className="sidebar-section-header">
                            <Lock className="icon-sm"/>
                            <h3 className="sidebar-section-title">Private Boards</h3>
                        </div>
                        <div className="sidebar-boards-list">
                            {
                                privateBoards.length === 0 && (
                                    <p className="no-board-message">No private boards available.</p>
                                )
                            }
                            {privateBoards.map(board => (
                                <button
                                    key={board.id}
                                    className={`sidebar-board-item ${currentBoardId === board.id ? 'active' : ''}`}
                                    onClick={() => handleBoardClick(board.id)}
                                >
                                    <span className="board-name">{board.name}</span>
                                    {board.isStarred && <Star className="icon-sm starred"/>}
                                </button>
                            ))}
                            <button className="sidebar-add-board" onClick={handleCreateBoard}>
                                <Plus className="icon-sm"/>
                                <span>Create new board</span>
                            </button>
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-section-header">
                            <Users className="icon-sm"/>
                            <h3 className="sidebar-section-title">Team Boards</h3>
                        </div>
                        <div className="sidebar-boards-list">
                            {
                                teamBoards.length === 0 && (
                                    <p className="no-board-message">No Public boards available.</p>
                                )
                            }
                            {teamBoards.map(board => (
                                <button
                                    key={board.id}
                                    className={`sidebar-board-item ${currentBoardId === board.id ? 'active' : ''}`}
                                    onClick={() => handleBoardClick(board.id)}
                                >
                                    <span className="board-name">{board.name}</span>
                                    {board.isStarred && <Star className="icon-sm starred"/>}
                                </button>
                            ))}
                            <button className="sidebar-add-board" onClick={handleCreateBoard}>
                                <Plus className="icon-sm"/>
                                <span>Create new board</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
