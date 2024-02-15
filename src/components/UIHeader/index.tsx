"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import LogoSvg from "~/assets/common/logo.png";

function UIHeader() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 10) {
          setIsScrolling(true);
        } else {
          setIsScrolling(false);
        }
      });
    };
  }, []);

  return (
    <header
      className={`${
        isScrolling ? "bg-[#141414] text-white" : "bg-transparent text-white"
      }
    top-0 transition-all duration-300 max-w-full w-full p-2 py-3 fixed z-50 h-[48px]`}
      style={{
        backgroundImage:
          "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
      }}
    >
      <div className="w-[95%] mx-auto flex items-center justify-around">
        <h1>
          <Image
            src={LogoSvg}
            alt="logo"
            width={80}
            height={150}
            className="w-[80px] "
          />
        </h1>
        <nav className="flex-1 ml-20">
          <ul className="flex items-center space-x-9">
            <li>Home</li>
            <li>Tv Show</li>
            <li>Movie</li>
            <li>New & popular</li>
            <li>My list</li>
            <li>Browser by language</li>
          </ul>
        </nav>
        <div className="flex items-center space-x-5">
          <p>search</p>
          <p>bell</p>
          <p>user</p>
        </div>
      </div>
    </header>
  );
}

export default UIHeader;
