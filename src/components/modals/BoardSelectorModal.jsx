import React from 'react';
import { X, Star, Users, Lock, Settings, Archive } from 'lucide-react';
import { Modal, Button, ModalFooter } from '../ui';
import { useBoards } from '../../contexts';


export const BoardSelectorModal = ({
    onClose,
    onBoardSelect,
    onCreateBoard,
    currentBoardId
}) => {
    const { privateBoards, publicBoards } = useBoards();

    const handleBoardClick = (board) => {
        onBoardSelect(board.id);
        onClose();
    };

    const handleCreateClick = () => {
        onCreateBoard();
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Select Board">
            <div className="board-selector-content">
                {privateBoards.length > 0 && (
                    <div className="board-section">
                        <div className="board-section-header">
                            <Lock className="icon-sm" />
                            <h3>Private Boards</h3>
                        </div>
                        <div className="board-grid">
                            {privateBoards.map(board => (
                                <div
                                    key={board.id}
                                    className={`board-card ${currentBoardId === board.id ? 'current' : ''}`}
                                    onClick={() => handleBoardClick(board)}
                                >
                                    <div className="board-card-header">
                                        <span className="board-name">{board.name}</span>
                                        {board.isStarred && <Star className="icon-sm starred" />}
                                    </div>
                                    <div className="board-card-meta">
                                        <Lock className="icon-xs" />
                                        <span>Private</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {publicBoards.length > 0 && (
                    <div className="board-section">
                        <div className="board-section-header">
                            <Users className="icon-sm" />
                            <h3>Team Boards</h3>
                        </div>
                        <div className="board-grid">
                            {publicBoards.map(board => (
                                <div
                                    key={board.id}
                                    className={`board-card ${currentBoardId === board.id ? 'current' : ''}`}
                                    onClick={() => handleBoardClick(board)}
                                >
                                    <div className="board-card-header">
                                        <span className="board-name">{board.name}</span>
                                        {board.isStarred && <Star className="icon-sm starred" />}
                                    </div>
                                    <div className="board-card-meta">
                                        <Users className="icon-xs" />
                                        <span>Team</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="board-section">
                    <div className="board-section-header">
                        <h3>Create New Board</h3>
                    </div>
                    <div className="create-board-card" onClick={handleCreateClick}>
                        <div className="create-board-content">
                            <span>Create new board</span>
                        </div>
                    </div>
                </div>
            </div>

            <ModalFooter>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};