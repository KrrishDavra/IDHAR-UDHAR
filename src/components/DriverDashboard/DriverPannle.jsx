import React from 'react'
import DashboardNav from './Components/DashboardNav'
import { useGlobalContext } from './../../contexts/GlobalContext';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function DriverPanel() {
    // eslint-disable-next-line
    const { Isonline, Issidebar, ToggleOnline, ToggleSidebar, darkMode } = useGlobalContext();
    const location = useLocation();
    
    let NavigationButtons = [
        {
            name: "Dashboard",
            navigation: "",
            icon: "fas fa-home"
        },
        {
            name: "Profile",
            navigation: "profile",
            icon: "fas fa-user"
        },
                {
            name: "Earnings",
            navigation: "earnings",
            icon: "fas fa-money-bill-wave"
        },
        {
            name: "Trip History",
            navigation: "ridehistory",
            icon: "fas fa-history"
        },
        // {
        //     name: "Games",
        //     navigation: "games",
        //     icon: "fas fa-gamepad"
        // },
        {
            name: "Settings",
            navigation: "settings",
            icon: "fas fa-cog"
        },
        {
            name: "Support",
            navigation: "support",
            icon: "fas fa-headset"
        },

    ]

    const isActive = (navigationPath) => {
        const currentPath = location.pathname;
        if (navigationPath === "") {
            return currentPath.endsWith('/driver') || currentPath.endsWith('/driver/');
        }
        return currentPath.includes(navigationPath);
    };

    return (
        <div className={`h-[100vh] w-full bg-black flex items-start ${darkMode ? 'dark' : ''}`}>
            {/* Sidebar */}
            <div className={` h-full z-20 transition-all duration-300
                ${Issidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                fixed lg:relative
                w-[240px] p-2 border-gray-800 border-gray-200`}>

                <button
                    onClick={ToggleSidebar}
                    className="lg:hidden p-2 m-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors absolute -right-0 -top-0"
                >
                    <i className="fas fa-times"></i>
                </button>

                <h3 className='flex  text-xl text-white font-medium pt-1'>
                    <img
                        src="/images/Idhar Udhar Logo.png"
                        alt="Idhar Udhar Logo"
                        className="w-15 h-auto"  
                    />
                </h3>

                <h5 className='text-xs text-gray-600 text-start font-bold mt-4'>
                    MAIN MENU
                </h5>

                <div className="sidebar-buttons w-full mt-3">
                    {NavigationButtons.map((button, i) => (
                        <Link to={`${button.navigation}`} key={i}>
                            <button 
                                className={`h-12 w-full ${isActive(button.navigation) 
                                    ? 'bg-orange-600 text-white' 
                                    : 'bg-transparent text-gray-300 hover:bg-gray-800'} 
                                    flex items-center justify-start ps-2 gap-2 rounded-lg mt-2 transition-colors`}
                                onClick={ToggleSidebar}
                            >
                                <i className={`${button.icon}`}></i> 
                                {button.name}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="MainBox lg:min-w-[85%] w-full h-full">
                <DashboardNav />
                <div className="h-[92%] w-full overflow-y-scroll bg-gray-950">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}