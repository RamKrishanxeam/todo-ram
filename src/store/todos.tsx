import { ReactNode, createContext, useState } from "react";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
}
interface TodosState {
  todos: Todo[];
  handleAddToDo(task: string): void;
}

export const TodosContext = createContext<TodosState | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      const NewTodo: Todo[] = [
        {
          id: Math.random().toString().length,
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      return NewTodo;
    });
  };
  return (
    <TodosContext.Provider value={{ todos, handleAddToDo }}>
      {children}
    </TodosContext.Provider>
  );
};
