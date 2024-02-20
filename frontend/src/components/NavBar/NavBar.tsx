import Link from "next/link";

const NavBar = () => {
    return (
        <div className="navbar bg-red-500 h-20 w-full text-white flex items-center justify-center">
            <Link href="/">
                <img src="logo.png" alt="logo" className="w-50 h-16" />
            </Link> 
        </div>
    );
};

export default NavBar