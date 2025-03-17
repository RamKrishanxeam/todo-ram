import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ReactNode, createContext, useEffect, useState } from "react";
import { db } from "../firebas/firebase";

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
}
interface TodosState {
  todos: Todo[];
  handleAddToDo(task: string): void;
  toggleTodoComplete(id: string): void;
  handlerDelete(id: string): void;
}

export const TodosContext = createContext<TodosState | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user!);
  console.log(userObj, "userObj");

  useEffect(() => {
    if (!userObj) {
      console.error("User not authenticated");
      return;
    }

    const q = query(
      collection(db, "todos"),
      where("userId", "==", userObj.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTodos: Todo[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Todo, "id">;
        return { id: doc.id, ...data };
      });
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, [userObj]);

  const handleAddToDo = async (task: string) => {
    if (!todos) return;
    if (!userObj) {
      console.error("User not authenticated");
      return;
    }

    try {
      const newTodo = {
        task,
        completed: false,
        createdAt: new Date(),
        userId: userObj.uid,
      };

      const docRef = await addDoc(collection(db, "todos"), newTodo);

      setTodos((prev) => [{ id: docRef.id, ...newTodo }, ...prev]);

      console.log("Todo added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodoComplete = async (id: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      await updateDoc(doc(db, "todos", id), {
        completed: updatedTodo.completed,
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handlerDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      console.log(`Todo with id ${id} deleted`);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <TodosContext.Provider
      value={{ todos, handleAddToDo, toggleTodoComplete, handlerDelete }}
    >
      {children}
    </TodosContext.Provider>
  );
};
