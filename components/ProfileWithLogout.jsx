import { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const ProfileWithLogout = () => {
  const { data: session, status } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  if (status === "loading" || !user) {
    return <div className="pr-8 mt-2">Loading...</div>;
  }

  return (
    <div
      className="relative flex items-center pr-8 mt-2"
      onMouseEnter={() => setIsHovered(true)}
    >
      {user?.name && <div className="text-center font-semibold mr-2">Profile</div>}
      <div className="relative">
        <Image
          onMouseEnter={() => setIsHovered(true)}
          src={user?.image || "/profile.jpg"}
          width={40}
          height={40}
          className="rounded-full hover:border-2 border-emerald-500 transition-all duration-100"
          alt="Profile Picture"
          unoptimized
        />
        {(isHovered && user?.name) && (
          <div
            onMouseLeave={() => setIsHovered(false)}
            className="absolute top-full right-0 mt-4 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            <button
              className="w-full flex justify-center px-4 py-2 text-left hover:bg-gray-100"
            >
              <Link href="/profile">Profile</Link>
            </button>
            <Button
              variant="myButton"
              onMouseEnter={() => setIsHovered(true)}
              className="w-full flex justify-center px-4 py-2 text-left"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileWithLogout;