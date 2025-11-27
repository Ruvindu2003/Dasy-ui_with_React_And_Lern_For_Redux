import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserAsync, updateUserAsync, fetchUserById } from '../UserReduser'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, UserPlusIcon, CheckIcon } from '@heroicons/react/24/outline'

const AddUser = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user: currentUser, loading } = useSelector((state) => state.user)

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        age: '',
        gender: 'MALE'
    })

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    // Load user data if editing
    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id))
        }
    }, [id, dispatch])

    // Update form when user data is loaded
    useEffect(() => {
        if (id && currentUser && currentUser.id === parseInt(id)) {
            setFormData({
                name: currentUser.name,
                address: currentUser.address,
                age: currentUser.age,
                gender: currentUser.gender
            })
        }
    }, [id, currentUser])

    const validate = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required'
        }

        if (!formData.age) {
            newErrors.age = 'Age is required'
        } else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 150) {
            newErrors.age = 'Age must be between 1 and 150'
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) {
            return
        }

        setSubmitting(true)

        try {
            if (id) {
                // Update existing user via API
                const result = await dispatch(updateUserAsync({
                    id: parseInt(id),
                    ...formData
                })).unwrap()
                console.log('User updated:', result)
            } else {
                // Add new user via API
                const result = await dispatch(addUserAsync(formData)).unwrap()
                console.log('User added:', result)
            }
            // Navigate back to user list after successful save
            navigate('/userList')
        } catch (error) {
            console.error('Error saving user:', error)
            // If backend is not available, still navigate back
            // The user will see sample data or can click "Refresh from Backend"
            if (error.message && error.message.includes('timeout')) {
                alert('Backend server is not running. Redirecting to user list...')
                navigate('/userList')
            } else {
                alert('Failed to save user: ' + (error.message || 'Unknown error'))
                setSubmitting(false)
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/userList')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 mb-4"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span className="font-medium">Back to Users</span>
                    </button>
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                            <UserPlusIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {id ? 'Edit User' : 'Add New User'}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                {id ? 'Update user information' : 'Fill in the details to create a new user'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white`}
                                    placeholder="Enter full name"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <span className="mr-1">⚠</span> {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Address Field */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none`}
                                    placeholder="Enter full address"
                                />
                                {errors.address && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <span className="mr-1">⚠</span> {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Age and Gender Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Age Field */}
                                <div>
                                    <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        min="1"
                                        max="150"
                                        className={`w-full px-4 py-3 border ${errors.age ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white`}
                                        placeholder="Enter age"
                                    />
                                    {errors.age && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <span className="mr-1">⚠</span> {errors.age}
                                        </p>
                                    )}
                                </div>

                                {/* Gender Field */}
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border ${errors.gender ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer`}
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <span className="mr-1">⚠</span> {errors.gender}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate('/userList')}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || loading}
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {submitting || loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckIcon className="h-5 w-5" />
                                        <span>{id ? 'Update User' : 'Save User'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                All fields marked with <span className="text-red-500 font-semibold">*</span> are required.
                                Age must be between 1 and 150 years.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser
