export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      // onClick={onClick}
      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
    >
      Edit
    </button>
  );
}
