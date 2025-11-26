import { useDispatch, useSelector } from "react-redux"
import Student from "./Student"
import { UserGroupIcon, MagnifyingGlassIcon, FunnelIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { addStudent } from "../UserReduser"

const StudentList = () => {

    const dispatch = useDispatch();


    const students = useSelector((state) => state.student)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();

    console.log('Students from Redux:', students);

    dispatch(addStudent({ id: 1, name: 'John Doe', email: 'john@example.com', grade: 'A', status: 'Active' },
    ))

    const filteredStudents = students?.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    const activeCount = students?.filter(s => s.status === 'Active').length || 0
    const inactiveCount = students?.filter(s => s.status === 'Inactive').length || 0

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
                                    Student Directory
                                </h1>
                                <p className="text-gray-500 mt-1">Manage and view all enrolled students</p>
                            </div>
                        </div>
                        <button
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
                            onClick={() => navigate('/addStudent')}
                        >
                            <PlusIcon className="h-5 w-5" />
                            <span>Add Student</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Students</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{students?.length || 0}</p>
                                <p className="text-sm text-green-600 mt-2 font-medium">↑ 12% from last month</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl">
                                <UserGroupIcon className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Students</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{activeCount}</p>
                                <p className="text-sm text-green-600 mt-2 font-medium">Currently enrolled</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl">
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Inactive</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{inactiveCount}</p>
                                <p className="text-sm text-amber-600 mt-2 font-medium">Not enrolled</p>
                            </div>
                            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl">
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                placeholder="Search by name or email..."
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

                {/* Students Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        All Students ({filteredStudents.length})
                    </h2>
                    {filteredStudents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredStudents.map((student) => (
                                <Student key={student.id} student={student} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserGroupIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentList
