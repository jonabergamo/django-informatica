import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from "next/navigation";

function Dropdown({ category }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()


    return (
        <div className="w-full bg-red-500">
            <motion.button onHoverStart={() => { setIsOpen(true) }} onHoverEnd={() => { setIsOpen(false) }} onClick={() => { router.replace('/' + category.path) }} className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{category.name}</motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }} className="absolute cursor-pointer" onHoverStart={() => { setIsOpen(true) }} onHoverEnd={() => { setIsOpen(false) }}>
                        {category.children.map((child) => (<li onClick={() => { router.replace('/' + category.path + '/' + child.path) }} className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2">{child.name}</li>))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Dropdown;
