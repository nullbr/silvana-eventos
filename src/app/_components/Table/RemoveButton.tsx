"use client";

export function RemoveButton({
  id,
  handleRemove,
}: {
  id: string;
  handleRemove: (id: string) => void;
}) {
  return (
    <button
      onClick={() => handleRemove(id)}
      className="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
    >
      Remove
    </button>
  );
}
