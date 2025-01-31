export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface SortableItemProps extends Pick<Todo, "id"| "completed"> {
  children: React.ReactNode;
  onDelete: (id: string) => void;
}
