'use client'
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { motion } from "framer-motion"
import Link from "next/link";
import { useState } from "react";
import { AlignLeft } from "lucide-react";
import { useAppContext } from "../context/UseContext";

export function Nav() {
    const { check } = useAppContext();
    const [show, setShow] = useState(false);

    const router = useRouter();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('_id');
        localStorage.removeItem('user-data');
        localStorage.removeItem('imageUrl');
        toast.success(`${check?.username} have logout`);
        router.push('/')
    }

    const displayNavBar = () => {
        setShow(!show);
    }

    return (
        <div className=" fixed w-full z-50 text-white bg-black py-3.5 px-1">
            <nav className="flex items-center justify-between">
                <div className="hidden lg:flex gap-3 ml-5">
                    <p>Hi {check?.username}</p>
                    <ul className="flex space-x-6">
                        {[
                            { list: 'home', path: '/home', id: 1 },
                            { list: 'bio-data', path: '/bio-data', id: 2 },
                            { list: 'account', path: '/bio-data/account', id: 3 },
                            { list: 'request', path: '/request', id: 4 },
                            { list: 'update-profile', path: '/update-profile', id: 5 }
                        ].map((el) => (
                            <li key={el.id}>
                                <Link href={el.path} className="hover:underline">
                                    {el.list}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden lg:flex lg:mr-5 space-x-4">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/">
                            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white cursor-pointer w-full">
                                Sign Up
                            </Button>
                        </Link>
                    </motion.div>
                    <Button className="cursor-pointer" onClick={handleLogOut}>Log out</Button>
                </div>


                <Button onClick={displayNavBar} variant="ghost" className=" text-slate-300 cursor-pointer focus:outline-blue-500 focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 md:hidden lg:hidden">
                    <AlignLeft />
                </Button>
            </nav>

            {show && (
                <motion.nav className={`fixed z-50 top-13 left-0 w-[100%] py-6 bg-blue-700 text-white transition-all duration-500 ease-in-out md:hidden lg:hidden ${show ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex flex-col gap-4">
                        {[
                            { list: 'home', path: '/home', id: 1 },
                            { list: 'bio-data', path: '/bio-data', id: 2 },
                            { list: 'account', path: '/bio-data/account', id: 3 },
                            { list: 'request', path: '/request', id: 4 },
                            { list: 'update-profile', path: '/update-profile', id: 5 }
                        ].map((item, index) => (
                            <Link href={item.path} key={item.list}>
                                <motion.div
                                    className="text-slate-300 hover:text-white transition-colors ml-4 cursor-pointer"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                                    whileHover={{ y: -2 }}
                                >
                                    {item.list}
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                    <motion.div
                        className=""
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="flex justify-center mt-3.5">
                            <Button onClick={handleLogOut} variant="ghost" className="text-slate-300 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:text-white cursor-pointer w-[90%]">
                                Logout
                            </Button>
                        </div>
                        <motion.div className="" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                            <Link href='/'>
                                <div className="flex justify-center mt-7">
                                    <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white cursor-pointer w-[90%]">
                                        sign up
                                    </Button>
                                </div>
                            </Link>
                        </motion.div>

                    </motion.div>
                </motion.nav>
            )}
        </div>
    )
}