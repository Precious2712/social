'use client';
import { Button } from "@/components/ui/button";
import { InfoItem } from "@/components/AuthFolder/InfoIem";
import { useAppContext } from "@/components/context/UseContext";
import { Nav } from "@/components/NavBar/Nav";

export default function UserAccountPage() {
    const { data, handleImageUpload, handleDeleteAccount, profileImage, triggerFileInput, fileInputRef, uploading, loading } = useAppContext();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Profile not found</h2>
                    <p className="text-gray-600">Unable to load user profile</p>
                    <p className="text-gray-600">Kindly create a profile to see your profile</p>
                </div>
            </div>
        );
    }

    // toast.success('Kindly refresh page if you have updated your profile for your profile to appear');

    return (
        <div>
            <Nav/>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-32 px-4 sm:px-6 lg:px-8 mt-">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 relative group">
                                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-blue-500 text-2xl font-bold">
                                            {data.firstname?.charAt(0)}{data.lastname?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={triggerFileInput}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {uploading && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{data.firstname} {data.lastname}</h1>
                                <p className="text-blue-100">@{data.username}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h2>
                                <div className="space-y-3">
                                    <InfoItem label="Gender" value={data.profileInfo[0]?.gender} />
                                    <InfoItem label="Age" value={data.profileInfo[0]?.age} />
                                    <InfoItem label="Country" value={data.profileInfo[0]?.country} />
                                    <InfoItem label="Occupation" value={data.profileInfo[0]?.occupation} />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Details</h2>
                                <div className="space-y-3">
                                    <InfoItem label="Religion" value={data.about[0]?.religion} />
                                    <InfoItem label="Marital Status" value={data.about[0]?.maritalStatus} />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Hobbies</h3>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {[data.hobby[0]?.one, data.hobby[0]?.two, data.hobby[0]?.three].filter(Boolean).map((hobby, index) => (
                                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                    {hobby}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">About</h2>
                                <p className="text-gray-700">
                                    {data.about[0]?.aboutYourself || "No description provided."}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 w-full">
                            <Button
                                variant="destructive"
                                className="w-full py-6 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 cursor-pointer"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}