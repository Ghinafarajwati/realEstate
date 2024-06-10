import { useState, useEffect } from "react";

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faLeaf, faUser, faBox, faBuilding } from '@fortawesome/free-solid-svg-icons'

export const Sidebar = () => {
    const [open, setOpen] = useState(true)

    useEffect(() => {
    new URLSearchParams(location.search);
    }, [location.search]);

    return (
        <>
        <div className="absolute h-full flex">
            <div className={`bg-slate-800 md:p-5 md:pt-10 transition-all duration-500 ${open ? "w-14 md:w-52" : "hidden md:block md:w-25"} relative`}>
                <div className={`bg-white md:px-3 md:py-2 rounded-full absolute md:-right-4 md:top-12 border border-solid border-2 border-yellow-500 cursor-pointer ${!open && 'rotate-180'} hidden md:block`} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faArrowLeft} className="text-lg"/>
                </div>
                <div className={`inline-flex mr-7 px-2 flex flex-col ${!open && "hidden"}`}>
                    <Link to='/'>
                    <div className="flex justify-center">
                    <FontAwesomeIcon icon={faLeaf} className="bg-blue-500 text-xl rounded-full cursor-pointer duration-500 text-white p-4"/>
                    </div>
                    </Link>
                    <h1 className={`md:text-white origin-left font-medium md:text-2xl duration-300 mt-2 hidden md:block ${!open && "hidden"}`}>Developer</h1>
                </div>

                <div className="mt-20" style={{marginLeft: !open && '-1rem'}}>  
                    <Link to='/dashboard?tab=profile'>
                    <div className="text-white text-lg flex items-center gap-x-4 cursor-pointer p-2 pl-2 hover:bg-yellow-500 rounded-md mt-2">
                        <span className="text-lg mx-2 md:block md:float-left"><FontAwesomeIcon icon={faUser}/></span>
                    <div className={`${!open && "md:hidden"} hidden md:block`}>
                    Profile
                    </div>
                    </div>
                    </Link>

                    <Link to='/dashboard?tab=create-listing'>
                    <div className="text-white text-lg flex items-center gap-x-4 cursor-pointer p-2 pl-2 hover:bg-yellow-500 rounded-md mt-2">
                        <span className="text-lg mx-2 md:block md:float-left"><FontAwesomeIcon icon={faBox}/></span>
                    <div className={`${!open && "md:hidden"} hidden md:block`}>
                    Create listing
                    </div>
                    </div>
                    </Link>

                    <Link to='/dashboard?tab=user-listing'>
                    <div className="text-white text-lg flex items-center gap-x-4 cursor-pointer p-2 pl-2 hover:bg-yellow-500 rounded-md mt-2">
                        <span className="text-lg mx-2 md:block md:float-left"><FontAwesomeIcon icon={faBuilding}/></span>
                    <div className={`${!open && "md:hidden"} hidden md:block`}>
                    User Listing
                    </div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}