import React from 'react'
import {
    HomeIcon,
    Square2StackIcon,
    TicketIcon,
    Cog6ToothIcon,
    MegaphoneIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    MagnifyingGlassIcon,
    InboxIcon,
    UserIcon,
    Cog8ToothIcon,
    ShieldCheckIcon,
    LightBulbIcon,
    ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'

const DashBoard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-100 shadow-lg">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">Dasy UI</a>
                    </div>
                    <div className="flex-none gap-2">
                        <button className="btn btn-ghost btn-circle">
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <InboxIcon className="h-5 w-5" />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        <span className="flex items-center gap-2">
                                            <UserIcon className="h-4 w-4" />
                                            My Profile
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <Cog8ToothIcon className="h-4 w-4" />
                                        Settings
                                    </a>
                                </li>
                                <li className="divider my-0"></li>
                                <li>
                                    <a>
                                        <ShieldCheckIcon className="h-4 w-4" />
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <LightBulbIcon className="h-4 w-4" />
                                        Share Feedback
                                    </a>
                                </li>
                                <li className="divider my-0"></li>
                                <li>
                                    <a>
                                        <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                                        Sign Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                    {/* Stats */}
                    <div className="stats shadow w-full mb-8">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <Square2StackIcon className="h-8 w-8" />
                            </div>
                            <div className="stat-title">Total Events</div>
                            <div className="stat-value text-primary">25</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <TicketIcon className="h-8 w-8" />
                            </div>
                            <div className="stat-title">Orders</div>
                            <div className="stat-value text-secondary">2.6K</div>
                            <div className="stat-desc">↗︎ 400 (22%)</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-accent">
                                <UserIcon className="h-8 w-8" />
                            </div>
                            <div className="stat-title">New Users</div>
                            <div className="stat-value">1,200</div>
                            <div className="stat-desc">↘︎ 90 (14%)</div>
                        </div>
                    </div>

                    {/* Content cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Recent Activity</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-12">
                                                <span className="text-xl">A</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">New order received</p>
                                            <p className="text-sm opacity-70">2 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary text-primary-content rounded-full w-12">
                                                <span className="text-xl">B</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Event published</p>
                                            <p className="text-sm opacity-70">1 hour ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Quick Actions</h2>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary">Create Event</button>
                                    <button className="btn btn-secondary">View Orders</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="bg-base-200 w-80 min-h-full">
                    {/* Sidebar header */}
                    <div className="p-4">
                        <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                            <div className="avatar">
                                <div className="w-10 rounded-lg">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Logo" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">Tailwind Labs</p>
                            </div>
                        </div>
                    </div>

                    {/* Main navigation */}
                    <ul className="menu px-4 py-2">
                        <li>
                            <a className="active">
                                <HomeIcon className="h-5 w-5" />
                                Home
                            </a>
                        </li>
                        <li>
                            <a>
                                <Square2StackIcon className="h-5 w-5" />
                                Events
                            </a>
                        </li>
                        <li>
                            <a>
                                <TicketIcon className="h-5 w-5" />
                                Orders
                            </a>
                        </li>
                        <li>
                            <a>
                                <Cog6ToothIcon className="h-5 w-5" />
                                Settings
                            </a>
                        </li>
                        <li>
                            <a>
                                <MegaphoneIcon className="h-5 w-5" />
                                Broadcasts
                            </a>
                        </li>
                    </ul>

                    {/* Upcoming Events section */}
                    <div className="px-4 mt-4">
                        <h3 className="menu-title">Upcoming Events</h3>
                        <ul className="menu">
                            <li><a>Bear Hug: Live in Concert</a></li>
                            <li><a>Viking People</a></li>
                            <li><a>Six Fingers — DJ Set</a></li>
                            <li><a>We All Look The Same</a></li>
                        </ul>
                    </div>

                    {/* Bottom section */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <ul className="menu">
                            <li>
                                <a>
                                    <QuestionMarkCircleIcon className="h-5 w-5" />
                                    Support
                                </a>
                            </li>
                            <li>
                                <a>
                                    <SparklesIcon className="h-5 w-5" />
                                    Changelog
                                </a>
                            </li>
                        </ul>

                        {/* User profile at bottom */}
                        <div className="mt-4 p-3 bg-base-100 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-lg">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">Erica</p>
                                    <p className="text-xs opacity-70 truncate">erica@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default DashBoard
