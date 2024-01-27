"use client";

import CustomLink from "./Link";
import { LoaderIcon } from "./LoadingIcon";

const loadingClasses = "cursor-not-allowed";
const defaultClasses =
  "rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 flex flex-row items-center justify-center";

export function Button({
  onAction,
  outline = false,
  type = "button",
  name,
  href,
  style,
  className,
  loading = false,
}: {
  onAction?: () => void | Promise<void>;
  outline?: boolean;
  type?: "button" | "submit" | "reset";
  name: string;
  href?: string;
  className?: string;
  loading?: boolean;
  style?:
    | "alternative"
    | "dark"
    | "light"
    | "green"
    | "red"
    | "yellow"
    | "purple";
}) {
  let classes = "";

  if (outline) {
    switch (style) {
      case "dark":
        classes =
          "border border-gray-800 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600";
        break;
      case "green":
        classes =
          "border border-green-700 text-green-700 hover:bg-green-800 hover:text-white focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600";
        break;
      case "red":
        classes =
          "border border-red-700 text-red-700 hover:bg-red-800 hover:text-white focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600";
        break;
      case "yellow":
        classes =
          "border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-white focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400";
        break;
      case "purple":
        classes =
          "border border-purple-700 text-purple-700 hover:bg-purple-800 hover:text-white focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-500";
        break;
      default:
        classes =
          "border border-blue-700 text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500";
        break;
    }
  } else {
    switch (style) {
      case "alternative":
        classes =
          "border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400";
        break;
      case "dark":
        classes =
          "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700";
        break;
      case "light":
        classes =
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600";
        break;
      case "green":
        classes =
          "bg-green-700 text-white hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
        break;
      case "red":
        classes =
          "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
        break;
      case "yellow":
        classes =
          "bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900";
        break;
      case "purple":
        classes =
          "mb-2 bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
        break;
      default:
        classes =
          "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
        break;
    }
  }

  if (href) {
    return (
      <CustomLink
        href={href}
        onClick={onAction}
        className={`${classes} ${defaultClasses} ${className}`}
      >
        {name}
      </CustomLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onAction}
      disabled={loading}
      className={`${classes} ${defaultClasses} ${className} ${
        loading ? loadingClasses : ""
      }}`}
    >
      {loading && <LoaderIcon />}
      {name}
    </button>
  );
}
