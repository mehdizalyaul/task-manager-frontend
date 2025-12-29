import { useState, useMemo, useCallback } from "react";
import { BoardContext } from "./context.js";
import { createEmptyBoardData, initialBoards } from "./utils.js";

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(initialBoards);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [boardsData, setBoardsData] = useState({});

  const privateBoards = useMemo(
    () => boards.filter((b) => b.visibility === "private"),
    [boards]
  );

  const teamBoards = useMemo(
    () => boards.filter((b) => b.visibility === "team"),
    [boards]
  );

  const currentBoard = useMemo(
    () => boards.find((b) => b.id === currentBoardId) ?? null,
    [boards, currentBoardId]
  );

  const currentBoardData = useMemo(() => {
    if (!currentBoardId) return null;
    return boardsData[currentBoardId] ?? createEmptyBoardData(currentBoardId);
  }, [currentBoardId, boardsData]);

  const createBoard = useCallback((data) => {
    const newBoard = {
      ...data,
      id: Date.now().toString(),
      isStarred: false,
    };

    setBoards((prev) => [...prev, newBoard]);
    setBoardsData((prev) => ({
      ...prev,
      [newBoard.id]: createEmptyBoardData(newBoard.id),
    }));
    setCurrentBoardId(newBoard.id);
  }, []);

  const deleteBoard = useCallback(
    (boardId) => {
      setBoards((prev) => prev.filter((b) => b.id !== boardId));
      setBoardsData((prev) => {
        const { [boardId]: _, ...rest } = prev;
        return rest;
      });

      if (currentBoardId === boardId) {
        const remaining = boards.filter((b) => b.id !== boardId);
        setCurrentBoardId(remaining[0]?.id ?? null);
      }
    },
    [currentBoardId, boards]
  );

  const switchToBoard = useCallback(
    (boardId) => {
      setCurrentBoardId(boardId);
      // Lazy initialize board data if needed (only for valid board IDs)
      if (boardId && !boardsData[boardId]) {
        setBoardsData((prev) => ({
          ...prev,
          [boardId]: createEmptyBoardData(boardId),
        }));
      }
    },
    [boardsData]
  );

  const toggleBoardFavorite = useCallback((boardId) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId ? { ...board, isStarred: !board.isStarred } : board
      )
    );
  }, []);

  // Board data operations (only work on current board)
  const updateBoardData = useCallback(
    (updates) => {
      if (!currentBoardId) return;

      setBoardsData((prev) => ({
        ...prev,
        [currentBoardId]: {
          ...prev[currentBoardId],
          ...updates,
        },
      }));
    },
    [currentBoardId]
  );

  const updateBoardMember = useCallback(
    (memberId, updates) => {
      if (!currentBoardId || !currentBoardData) return;

      const updatedMembers = currentBoardData.members.map((member) =>
        member.id === memberId ? { ...member, ...updates } : member
      );

      updateBoardData({ members: updatedMembers });
    },
    [currentBoardId, currentBoardData, updateBoardData]
  );

  const value = useMemo(
    () => ({
      privateBoards,
      teamBoards,
      currentBoardId,
      currentBoard,
      currentBoardData,
      createBoard,
      deleteBoard,
      switchToBoard,
      toggleBoardFavorite,
      updateBoardData,
      updateBoardMember,
    }),
    [
      privateBoards,
      teamBoards,
      currentBoardId,
      currentBoard,
      currentBoardData,
      createBoard,
      deleteBoard,
      switchToBoard,
      toggleBoardFavorite,
      updateBoardData,
      updateBoardMember,
    ]
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
