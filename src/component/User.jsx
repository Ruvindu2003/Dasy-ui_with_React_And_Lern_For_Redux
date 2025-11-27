import { useDispatch } from 'react-redux'
import { removeUserAsync } from '../UserReduser'
import { useNavigate } from 'react-router-dom'
import { PencilIcon, TrashIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'

const User = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            try {
                await dispatch(removeUserAsync(user.id)).unwrap()
            } catch (error) {
                alert('Failed to delete user: ' + (error.message || 'Unknown error'))
            }
        }
    }

    const handleEdit = () => {
        navigate(`/editUser/${user.id}`)
    }

    // Gender badge colors
    const getGenderBadge = (gender) => {
        const badges = {
            MALE: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
            FEMALE: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white',
            OTHER: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
        }
        return badges[gender] || 'bg-gray-500 text-white'
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Header with gradient */}
            <div className={`h-2 ${getGenderBadge(user.gender).replace('text-white', '')}`}></div>

            <div className="p-6">
                {/* User Info */}
                <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getGenderBadge(user.gender)}`}>
                                {user.gender}
                            </span>
                        </div>
                    </div>

                    {/* Address */}\r
                    <div className="flex items-start space-x-2 text-gray-600 mb-3">
                        <MapPinIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-indigo-500" />
                        <p className="text-sm leading-relaxed">{user.adrees || user.address}</p>
                    </div>

                    {/* Age */}
                    <div className="flex items-center space-x-2 text-gray-600">
                        <CalendarIcon className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                        <p className="text-sm font-medium">{user.age} years old</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                        onClick={handleEdit}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        <PencilIcon className="h-4 w-4" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        <TrashIcon className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default User
