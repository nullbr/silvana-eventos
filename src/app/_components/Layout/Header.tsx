import { siteMetadata } from "~/server/siteMetadata";
import headerNavLinks from "~/server/headerNavLinks";
import Link from "../Shared/Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import SearchButton from "./SearchButton";
import Image from "../Shared/Image";
import ProtectedLink from "../Admin/ProtectedLink";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <Image
              placeholder="blur"
              src="/images/logo.png"
              blurDataURL="/images/logo.png"
              alt="Logo"
              width="200"
              height="40"
            />
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <ProtectedLink
          href="/admin"
          title="Admin"
          cls="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        />
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
