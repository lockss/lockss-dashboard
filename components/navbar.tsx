import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
      <div className="navbar fixed p-0 min-h-0 border-b-1 border-gray-50 z-10 backdrop-blur-xl bg-base-100/80">

        <div className="navbar-start hidden lg:flex">
          <div className="p-2 pl-4">
            <Image alt="LOCKSS" width={100} height={25} src={"/lockss-logo-v1-300w_0.webp"}/>
          </div>

          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Overview</Link></li>
          </ul>
        </div>

      </div>
  )
}
