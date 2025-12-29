import React from 'react';
import {Star, Users, Lock} from 'lucide-react';
import {useBoards} from '../../../contexts';

import './Home.css';


export const Home = ({onBoardSelect}) => {
    const {privateBoards, teamBoards, toggleBoardFavorite} = useBoards();

    const handleBoardClick = (board) => {
        onBoardSelect(board.id);
    };

    const handleStarClick = (e, boardId) => {
        e.stopPropagation();
        toggleBoardFavorite(boardId);
    };

    const BoardCard = ({board, onClick}) => (
        <div className="board-card" onClick={onClick}>
            <div className="board-card-header">
                <h3 className="board-card-title">{board.name}</h3>
                <div className="board-card-actions">
                    <button
                        className={`star-btn ${board.isStarred ? 'starred' : ''}`}
                        onClick={(e) => handleStarClick(e, board.id)}
                    >
                        <Star size={16}/>
                    </button>
                </div>
            </div>
            {board.description && (
                <p className="board-card-description">{board.description}</p>
            )}
            <div className="board-card-footer">
                <div className="board-visibility">
                    {board.visibility === 'private' ? (
                        <>
                            <Lock size={14}/>
                            <span>Private</span>
                        </>
                    ) : (
                        <>
                            <Users size={14}/>
                            <span>Team</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    const starredBoards = [...privateBoards, ...teamBoards].filter(board => board.isStarred);

    return (
        <div className="home-container">
            <div className="home-content">
                <header className="home-header">
                    <h1>Welcome to Trello Clone</h1>
                    <p>Choose a board to get started or create a new one</p>
                </header>

                {starredBoards.length > 0 && (
                    <section className="boards-section">
                        <div className="section-header">
                            <Star size={20}/>
                            <h2>Starred Boards</h2>
                        </div>
                        <div className="boards-grid">
                            {starredBoards.map((board) => (
                                <BoardCard
                                    key={board.id}
                                    board={board}
                                    onClick={() => handleBoardClick(board)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {privateBoards.length > 0 && (
                    <section className="boards-section">
                        <div className="section-header">
                            <Lock size={20}/>
                            <h2>Personal Boards</h2>
                        </div>
                        <div className="boards-grid">
                            {privateBoards.map((board) => (
                                <BoardCard
                                    key={board.id}
                                    board={board}
                                    onClick={() => handleBoardClick(board)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {teamBoards.length > 0 && (
                    <section className="boards-section">
                        <div className="section-header">
                            <Users size={20}/>
                            <h2>Team Boards</h2>
                        </div>
                        <div className="boards-grid">
                            {teamBoards.map((board) => (
                                <BoardCard
                                    key={board.id}
                                    board={board}
                                    onClick={() => handleBoardClick(board)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {privateBoards.length === 0 && teamBoards.length === 0 && (
                    <div className="empty-state">
                        <h2>No boards yet</h2>
                        <p>Create your first board to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
};