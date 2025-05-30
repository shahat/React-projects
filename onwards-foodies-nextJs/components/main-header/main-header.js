import Link from "next/link";
import Image from "next/image";
import Imglogo from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "@/components/nav-link/nav-link";
function MainHeader() {
  const headerLinks = [
    { href: "/meals", label: "Meals" },
    { href: "/community", label: "Community" },
  ];
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={Imglogo} alt="logo" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            {headerLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
