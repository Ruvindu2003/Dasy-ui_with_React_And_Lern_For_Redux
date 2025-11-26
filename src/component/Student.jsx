import { EnvelopeIcon, AcademicCapIcon, CheckBadgeIcon, ClockIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { removeStudent } from '../UserReduser'

const Student = ({ student }) => {
    const dispatch = useDispatch()

    // ✅ DISPATCH EXAMPLE 1: Delete a student
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
            dispatch(removeStudent(student.id))
        }
    }

    // ✅ DISPATCH EXAMPLE 2: Edit a student (placeholder for now)
    const handleEdit = () => {
        // You can navigate to an edit page or open a modal
        alert(`Edit functionality for ${student.name} - Coming soon!`)
        // Example: navigate(`/editStudent/${student.id}`)
    }
    const getGradeColor = (grade) => {
        if (grade?.includes('A')) return 'from-green-500 to-emerald-600'
        if (grade?.includes('B')) return 'from-blue-500 to-indigo-600'
        if (grade?.includes('C')) return 'from-yellow-500 to-amber-600'
        return 'from-gray-500 to-gray-600'
    }

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'
    }

    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
            {/* Card Header with Gradient */}
            <div className={`bg-gradient-to-r ${getGradeColor(student.grade)} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-1 rounded-2xl">
                            <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                                <span className={`text-2xl font-bold bg-gradient-to-r ${getGradeColor(student.grade)} bg-clip-text text-transparent`}>
                                    {getInitials(student.name)}
                                </span>
                            </div>
                        </div>

                        {/* Name and Status */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-sm">
                                {student.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                                {student.status === 'Active' ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-30 text-white backdrop-blur-sm">
                                        <CheckBadgeIcon className="h-3 w-3 mr-1" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-30 text-white backdrop-blur-sm">
                                        <ClockIcon className="h-3 w-3 mr-1" />
                                        Inactive
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Grade Badge */}
                    <div className="bg-white bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-xl">
                        <div className="text-center">
                            <p className="text-xs text-white opacity-90 font-medium">Grade</p>
                            <p className="text-2xl font-bold text-white">{student.grade}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
                {/* Email */}
                {student.email && (
                    <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <EnvelopeIcon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                            <p className="text-sm text-gray-900 font-medium truncate">{student.email}</p>
                        </div>
                    </div>
                )}

                {/* Additional Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {student.grade && (
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3 rounded-xl border border-purple-100">
                            <div className="flex items-center space-x-2 mb-1">
                                <AcademicCapIcon className="h-4 w-4 text-purple-600" />
                                <p className="text-xs text-purple-600 font-semibold uppercase">Performance</p>
                            </div>
                            <p className="text-lg font-bold text-purple-900">{student.grade}</p>
                        </div>
                    )}

                    {student.status && (
                        <div className={`p-3 rounded-xl border ${student.status === 'Active'
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
                            : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100'
                            }`}>
                            <div className="flex items-center space-x-2 mb-1">
                                {student.status === 'Active' ? (
                                    <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                                ) : (
                                    <ClockIcon className="h-4 w-4 text-amber-600" />
                                )}
                                <p className={`text-xs font-semibold uppercase ${student.status === 'Active' ? 'text-green-600' : 'text-amber-600'
                                    }`}>
                                    Status
                                </p>
                            </div>
                            <p className={`text-lg font-bold ${student.status === 'Active' ? 'text-green-900' : 'text-amber-900'
                                }`}>
                                {student.status}
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                        onClick={handleEdit}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        <PencilIcon className="h-4 w-4" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-50 hover:bg-red-100 text-red-600 py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center border border-red-200 hover:border-red-300"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
        </div>
    )
}

export default Student
