import { useSelector, useDispatch } from 'react-redux'
import User from './User'
import { UserGroupIcon, MagnifyingGlassIcon, FunnelIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../UserReduser'

const UserList = () => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector((state) => state.user)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    // Fetch users from backend on component mount
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const filteredUsers = users?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    const maleCount = users?.filter(u => u.gender === 'MALE').length || 0
    const femaleCount = users?.filter(u => u.gender === 'FEMALE').length || 0
    const otherCount = users?.filter(u => u.gender === 'OTHER').length || 0

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-gray-700">Loading users...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
                    <div className="text-center">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Users</h3>
                        <p className="text-gray-600 mb-4">{error.message || 'Failed to fetch users from server'}</p>
                        <button
                            onClick={() => dispatch(fetchUsers())}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                                <UserGroupIcon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    User Directory
                                </h1>
                                <p className="text-gray-500 mt-1">Manage and view all registered users</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 border border-gray-200"
                                onClick={() => dispatch(fetchUsers())}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Refresh from Backend</span>
                            </button>
                            <button
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
                                onClick={() => navigate('/addUser')}
                            >
                                <PlusIcon className="h-5 w-5" />
                                <span>Add User</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Users</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{users?.length || 0}</p>
                                <p className="text-sm text-green-600 mt-2 font-medium">All registered</p>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-2xl">
                                <UserGroupIcon className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Male</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{maleCount}</p>
                                <p className="text-sm text-blue-600 mt-2 font-medium">Users</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl">
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Female</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{femaleCount}</p>
                                <p className="text-sm text-pink-600 mt-2 font-medium">Users</p>
                            </div>
                            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-2xl">
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Other</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{otherCount}</p>
                                <p className="text-sm text-purple-600 mt-2 font-medium">Users</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl">
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or address..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                            />
                        </div>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200">
                            <FunnelIcon className="h-5 w-5" />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                {/* Users Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        All Users ({filteredUsers.length})
                    </h2>
                    {filteredUsers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers.map((user) => (
                                <User key={user.id} user={user} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserGroupIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria or add a new user</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserList
