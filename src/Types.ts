export interface Todo {
  id: string;
  text: string;
}

export interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  onDelete: (id: string) => void;
}