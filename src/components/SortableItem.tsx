'use client'; // Required for client-side interactivity

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableItemProps } from '@/Types';

export const SortableItem = ({
  id,
  children,
  onDelete,
}: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex justify-between items-center p-2 mb-2 bg-gray-900 border border-gray-300 rounded shadow-sm cursor-move"
    >
      <span className="capitalize text-gray-400">{children}</span>
      <button
        type="button"
        onClick={() => handleDeleteClick}
        className="text-red-500 hover:text-yellow-400 text-sm mr-3 font-bold uppercase"
      >
        Delete
      </button>
    </div>
  );
};
