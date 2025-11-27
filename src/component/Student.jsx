import { EnvelopeIcon, AcademicCapIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeStudentAsync } from '../UserReduser'

const Student = ({ student }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
            dispatch(removeStudentAsync(student.id))
        }
    }

    const handleEdit = () => {
        navigate(`/editStudent/${student.id}`)
    }

    // Choose a gradient based on age for visual flair
    const getAgeColor = (age) => {
        if (age >= 60) return 'from-green-500 to-emerald-600'
        if (age >= 40) return 'from-blue-500 to-indigo-600'
        if (age >= 20) return 'from-yellow-500 to-amber-600'
        return 'from-gray-500 to-gray-600'
    }

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'
    }

    const address = student.adrees || student.address || ''

    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
            {/* Header with gradient based on age */}
            <div className={`bg-gradient-to-r ${getAgeColor(student.age)} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-1 rounded-2xl">
                            <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                                <span className={`text-2xl font-bold bg-gradient-to-r ${getAgeColor(student.age)} bg-clip-text text-transparent`}>{getInitials(student.name)}</span>
                            </div>
                        </div>
                        {/* Name and Address */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-sm">{student.name}</h3>
                            <div className="flex items-center space-x-2 text-white">
                                <EnvelopeIcon className="h-4 w-4" />
                                <span className="text-sm">{address}</span>
                            </div>
                        </div>
                    </div>
                    {/* Age Badge */}
                    <div className="bg-white bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-xl">
                        <div className="text-center">
                            <p className="text-xs text-white opacity-90 font-medium">Age</p>
                            <p className="text-2xl font-bold text-white">{student.age ?? 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6">
                {student.gender && (
                    <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <AcademicCapIcon className="h-5 w-5 text-indigo-600" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Gender</p>
                            <p className="text-sm text-gray-900 font-medium capitalize">{student.gender}</p>
                        </div>
                    </div>
                )}
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
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
        </div>
    )
}

export default Student
