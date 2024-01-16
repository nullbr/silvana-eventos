import Link from "next/link";
interface Props {
  tag: string;
}

const Tag = ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {tag.split(" ").join("-")}
    </Link>
  );
};

export default Tag;
