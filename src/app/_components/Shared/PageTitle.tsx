export function PageTitle({
  title,
  summary,
}: {
  title: string;
  summary?: string;
}) {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {title}
      </h1>
      {summary && (
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {summary}
        </p>
      )}
    </div>
  );
}
