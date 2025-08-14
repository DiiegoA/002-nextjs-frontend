import { useEffect, useState } from "react";
import ToDo from "./todo";
import styles from "./todo-list.module.css";
import { AnimatePresence, motion } from "framer-motion";

export default function ToDoList() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/todos/`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    await fetch(`${API_URL}/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTask, completed: false }),
    });
    setNewTask("");
    fetchTodos();
  };

  const updateTodo = async (id, updatedData) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const handleCheckboxChange = (id, completed) => {
    updateTodo(id, { completed });
  };

  const handleEdit = (id, updatedData) => {
    updateTodo(id, updatedData);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .sort((a, b) => a.completed - b.completed); // pendientes primero

  return (
    <div>
      {/* Input nueva tarea */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.button}>
          Agregar
        </button>
      </div>

      {/* Botones de filtro */}
      <div className={styles.filters}>
        <button
          className={filter === "all" ? styles.activeFilter : ""}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={filter === "active" ? styles.activeFilter : ""}
          onClick={() => setFilter("active")}
        >
          Pendientes
        </button>
        <button
          className={filter === "completed" ? styles.activeFilter : ""}
          onClick={() => setFilter("completed")}
        >
          Completadas
        </button>
      </div>

      {/* Lista animada */}
      <AnimatePresence>
        {filteredTodos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <ToDo
              todo={todo}
              onDelete={deleteTodo}
              onToggle={handleCheckboxChange}
              onEdit={handleEdit}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
