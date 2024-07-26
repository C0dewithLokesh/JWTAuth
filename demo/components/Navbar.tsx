import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar w-full flex flex-col gap-5 px-5">
      <div className="navContent flex flex-col gap-5 sm:flex-row sm:justify-between sm:px-5 ">
        <Link
          href={"https://www.npmjs.com/package/@lokesh-kaushik/jwt-auth"}
          className="heading text-primary text-lg sm:text-2xl cursor-pointer"
          target="_blank"
        >
          @lokesh-kaushik/jwt-auth Demo
        </Link>
        <div className="navLinks flex gap-3 sm:gap-5">
          <Link href="https://github.com/c0dewithLokesh/" target="_blank">
            <Image
              className="cursor-pointer h-auto sm:h-7"
              src="/assets/github-icon.svg"
              alt=""
              width={30}
              height={30}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/lokesh--kaushik/"
            target="_blank"
          >
            <Image
              className="cursor-pointer h-auto sm:h-7"
              src="/assets/linked-in-icon.svg"
              alt=""
              width={30}
              height={30}
            />
          </Link>
          <Link
            href="https://www.npmjs.com/package/@lokesh-kaushik/jwt-auth"
            target="_blank"
          >
            <Image
              className="cursor-pointer h-auto sm:h-7"
              src="/assets/npm-icon.svg"
              alt=""
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>

      <hr className="w-full h-0.5 bg-primary border-none" />
    </nav>
  );
};

export default Navbar;
