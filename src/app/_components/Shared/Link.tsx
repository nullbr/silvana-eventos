/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link";
import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

type customProps = {
  disable?: boolean;
};

const CustomLink = ({
  href,
  disable = false,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & customProps) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (disable) {
    return <span {...rest} />;
  }

  if (isInternalLink) {
    return <Link href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
