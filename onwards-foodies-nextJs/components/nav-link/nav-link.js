"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";
function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <li>
      <Link href={href}  className={`${classes.link} ${isActive ? classes.active : ""}`}
>
        {children}
      </Link>
    </li>
  );
}

export default NavLink;