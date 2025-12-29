import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { Header, Sidebar } from "./components/layout";
import { SortableColumn, AddColumn, Card } from "./components/ui";
import { Home } from "./components/pages";
import {
  UpdateTaskModal,
  ProfileModal,
  ProjectSettingsModal,
  AddTaskModal,
  MembersModal,
  AddColumnModal,
  UpdateColumnModal,
  CreateBoardModal,
} from "./components/modals";
import { useTasksContext, usePermissions, useBoards } from "./contexts";

import "./styles/App.css";

const initialModalState = {
  updateTask: null,
  profile: false,
  projectSettings: false,
  addTask: null,
  members: false,
  addColumn: false,
  updateColumn: null,
  createBoard: false,
};

export const App = () => {
  const [modals, setModals] = useState(initialModalState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [dragOverTask, setDragOverTask] = useState(null);

  const {
    updateTask,
    addTask,
    columns,
    addColumn,
    updateColumn,
    deleteColumn,
    reorderTasks,
    moveTaskBetweenColumns,
  } = useTasksContext();
  const { createBoard, currentBoardId, switchToBoard } = useBoards();

  const permissions = usePermissions();
  const canEdit = permissions.canEdit;
  const canChangeSettings = permissions.canChangeSettings;

  const openModal = (key, value = true) => {
    setModals((prev) => ({ ...prev, [key]: value }));
  };

  const closeModal = (key) => {
    setModals((prev) => ({
      ...prev,
      [key]:
        key === "updateTask" || key === "addTask" || key === "updateColumn"
          ? null
          : false,
    }));
  };

  const handleCardClick = (task) => {
    openModal("updateTask", task);
  };

  const handleSaveTask = (updatedTask) => {
    updateTask(updatedTask);
    closeModal("updateTask");
  };

  const handleAddCard = (columnId, columnTitle) => {
    openModal("addTask", { columnId, columnTitle });
  };

  const handleSaveNewTask = (newTask) => {
    if (modals.addTask) {
      addTask(modals.addTask.columnId, newTask);
      closeModal("addTask");
    }
  };

  const handleEditColumn = (columnId, columnTitle) => {
    openModal("updateColumn", { columnId, columnTitle });
  };

  const handleSaveNewColumn = (columnName) => {
    addColumn(columnName);
    closeModal("addColumn");
  };

  const handleUpdateColumn = (columnId, newName) => {
    updateColumn(columnId, newName);
    closeModal("updateColumn");
  };

  const handleDeleteColumn = (columnId) => {
    deleteColumn(columnId);
    closeModal("updateColumn");
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const taskId = active.id;

    const task = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === taskId);

    setActiveTask(task || null);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (over) {
      const overId = over.id;
      const isOverTask = columns.some((col) =>
        col.tasks.some((task) => task.id === overId)
      );
      setDragOverTask(isOverTask ? overId : null);
    } else {
      setDragOverTask(null);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    setDragOverTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === activeId)
    );
    const destColumn = columns.find(
      (col) => col.id === overId || col.tasks.some((task) => task.id === overId)
    );

    if (!sourceColumn || !destColumn) return;

    if (overId === destColumn.id) {
      if (sourceColumn.id !== destColumn.id) {
        moveTaskBetweenColumns(
          activeId,
          sourceColumn.id,
          destColumn.id,
          destColumn.tasks.length
        );
      }
      return;
    }

    if (sourceColumn.id === destColumn.id) {
      reorderTasks(sourceColumn.id, activeId, overId);
    } else {
      const overTaskIndex = destColumn.tasks.findIndex(
        (task) => task.id === overId
      );
      moveTaskBetweenColumns(
        activeId,
        sourceColumn.id,
        destColumn.id,
        overTaskIndex
      );
    }
  };

  const dropAnimation = {
    duration: 200,
    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.8",
        },
      },
    }),
  };

  const handleCreateBoard = (boardData) => {
    createBoard(boardData);
    closeModal("createBoard");
  };

  const handleBoardSelect = (boardId) => {
    switchToBoard(boardId);
  };

  return (
    <div className="trello-board">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateBoard={() => openModal("createBoard")}
      />

      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        onProfileClick={() => openModal("profile")}
        onSettingsClick={() => openModal("projectSettings")}
        onMembersClick={() => openModal("members")}
      />

      {currentBoardId ? (
        <div className="board-container">
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="board-columns">
              {columns.map((column) => (
                <SortableColumn
                  key={column.id}
                  column={column}
                  onCardClick={handleCardClick}
                  onAddCard={() => handleAddCard(column.id, column.title)}
                  onEditColumn={() => handleEditColumn(column.id, column.title)}
                  dragOverTaskId={dragOverTask}
                />
              ))}
              {canEdit && <AddColumn onClick={() => openModal("addColumn")} />}
            </div>
            <DragOverlay dropAnimation={dropAnimation}>
              {activeTask ? (
                <div className="drag-overlay-card">
                  <Card
                    tags={activeTask.tags}
                    title={activeTask.title}
                    date={activeTask.date}
                    assignee={activeTask.assignee || undefined}
                    emoji={activeTask.emoji}
                    priority={activeTask.priority}
                    onClick={() => {}}
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      ) : (
        <Home onBoardSelect={handleBoardSelect} />
      )}

      {modals.updateTask && (
        <UpdateTaskModal
          onClose={() => closeModal("updateTask")}
          onSave={handleSaveTask}
          task={modals.updateTask}
        />
      )}

      {modals.profile && <ProfileModal onClose={() => closeModal("profile")} />}

      {modals.projectSettings && canChangeSettings && (
        <ProjectSettingsModal onClose={() => closeModal("projectSettings")} />
      )}

      {modals.addTask && (
        <AddTaskModal
          onClose={() => closeModal("addTask")}
          onSave={handleSaveNewTask}
          columnTitle={modals.addTask.columnTitle}
        />
      )}

      {modals.members && <MembersModal onClose={() => closeModal("members")} />}

      {modals.addColumn && (
        <AddColumnModal
          onClose={() => closeModal("addColumn")}
          onSave={handleSaveNewColumn}
        />
      )}

      {modals.updateColumn && (
        <UpdateColumnModal
          columnId={modals.updateColumn.columnId}
          currentName={modals.updateColumn.columnTitle}
          onClose={() => closeModal("updateColumn")}
          onSave={handleUpdateColumn}
          onDelete={handleDeleteColumn}
        />
      )}

      {modals.createBoard && (
        <CreateBoardModal
          onClose={() => closeModal("createBoard")}
          onSave={handleCreateBoard}
        />
      )}
    </div>
  );
};
