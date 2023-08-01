"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Loader from "./Loader";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const handleSetProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    handleSetProviders();
  }, []);

  const renderProviders = providers ? (
    Object.values(providers).map((provider) => (
      <button
        type="button"
        className="black_btn"
        key={provider.name}
        onClick={() => signIn(provider.id)}
      >
        Sign in with {provider.name}
      </button>
    ))
  ) : (
    <Loader />
  );

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href={"/"}>
        <Image
          src={"/assets/images/logo.svg"}
          alt="Promptopia Logo"
          width={32}
          height={32}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>{renderProviders}</>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>

                <button
                  className="black_btn w-full mt-5"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>{renderProviders}</>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
