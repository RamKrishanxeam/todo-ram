import { ReactNode, createContext, useState } from "react";

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
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (error) {
      return [];
    }
  });
  const handleAddToDo = (task: string) => {
    if (!todos) return;
    setTodos((prev) => {
      const NewTodo: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(NewTodo));
      return NewTodo;
    });
  };

  const toggleTodoComplete = (id: string) => {
    setTodos((prev) => {
      let newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    });
  };
  const handlerDelete = (id: string) => {
    setTodos((prev) => {
      let newTodos = prev.filter((fitlerID) => fitlerID.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };
  return (
    <TodosContext.Provider
      value={{ todos, handleAddToDo, toggleTodoComplete, handlerDelete }}
    >
      {children}
    </TodosContext.Provider>
  );
};
