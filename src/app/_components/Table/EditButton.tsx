"use client";

export function EditButton({
  id,
  handleEdit,
}: {
  id: string;
  handleEdit: (id: string) => void;
}) {
  return (
    <button
      onClick={() => handleEdit(id)}
      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
    >
      Editar
    </button>
  );
}
