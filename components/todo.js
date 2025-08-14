import { useState } from "react";
import styles from "./todo.module.css";

export default function ToDo({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedName.trim() && editedName !== todo.name) {
      onEdit(todo.id, { name: editedName });
    } else {
      setEditedName(todo.name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedName(todo.name);
    }
  };

  return (
    <div className={styles.todo}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
        style={{ marginRight: "1rem" }}
      />

      {isEditing ? (
        <input
          className={styles.editInput}
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className={`${styles.todoText} ${
            todo.completed ? styles.completed : ""
          }`}
          onDoubleClick={handleDoubleClick}
          title="Doble clic para editar"
        >
          {todo.name}
        </span>
      )}

      <button onClick={() => onDelete(todo.id)} className={styles.deleteButton}>
        ❌
      </button>
    </div>
  );
}
