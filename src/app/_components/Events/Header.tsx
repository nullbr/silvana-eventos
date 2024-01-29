import { Tags } from "./Tags";

export function Header({
  title,
  tags,
  date,
}: {
  title: string;
  tags?: string[];
  date?: Date;
}) {
  return (
    <div className="space-y-2 pb-8 pt-6 text-center md:space-y-5 ">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {title}
      </h1>

      <p className="text-center text-sm leading-7 text-gray-500 dark:text-gray-400">
        {date?.toLocaleDateString()}
      </p>

      {!!tags && tags.length > 0 && (
        <div className="flex flex-wrap justify-center">
          <Tags tags={tags ?? []} />
        </div>
      )}
    </div>
  );
}
