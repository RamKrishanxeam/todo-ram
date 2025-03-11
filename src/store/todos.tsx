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
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddToDo = (task: string) => {
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
      return newTodos;
    });
  };
  const handlerDelete = (id: string) => {
    setTodos((prev) => {
      let newTodos = prev.filter((fitlerID) => fitlerID.id !== id);
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
