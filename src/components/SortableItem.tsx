'use client'; // Required for client-side interactivity

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableItemProps } from '@/Types';

export const SortableItem = ({
  id,
  children,
  onDelete,
  completed,
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
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        data-no-dnd="true"
        className="flex justify-between items-center p-2 mb-2 bg-gray-900 border border-gray-300 rounded shadow-sm cursor-move"
      >
        <span
          className={`${
            completed
              ? 'line-through text-sky-200 capitalize'
              : 'text-green-400 capitalize'
          }`}
        >
          {children}
        </span>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="text-red-500 hover:text-yellow-400 text-sm mr-3 font-bold uppercase pointer-events-auto"
        >
          Delete
        </button>
      </div>
    </>
  );
};
