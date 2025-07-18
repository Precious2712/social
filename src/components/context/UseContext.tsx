'use client';

import { portfolio } from '@/data/authFields/data-types';
import axios from 'axios';
import { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { User } from '@/data/authFields/user';
import { sender } from '@/data/authFields/request';
import { userField } from '@/data/authFields/currentUser';

type AppContextType = {
    userData: () => void;
    data: portfolio | null;
    handleDeleteAccount: () => void;
    currentUser: () => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    profileImage: string | null;
    uploading: boolean;
    loading: boolean;
    request: sender | null;
    setRequest: React.Dispatch<React.SetStateAction<sender | null>>;
    check: userField | null;
    triggerFileInput: () => void;
    senderHandleRequest: (id: string) => Promise<sender | undefined>;
    checkSearchField: (firstname: string) => Promise<User[]>;
    sendFriendRequest: (id: string) => Promise<void>;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [data, setData] = useState<portfolio | null>(null);
    const [request, setRequest] = useState<sender | null>(null);

    const [loading, setLoading] = useState(true);
    const [check, setCheck] = useState<userField | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const id = localStorage.getItem('_id');

        setUploading(true);

        try {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setProfileImage(imageUrl);
            };
            reader.readAsDataURL(file);

            const image = new FormData();
            image.append('image', file);

            const response = await axios.put(`https://reqflow.onrender.com/auth/upload/${id}`, image);
            localStorage.setItem('imageUrl', response.data.imageUrl);
            console.log('response', response);
        } catch (error) {
            console.error("Error uploading image:", error);
            setProfileImage(null);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (toast.success("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const id = localStorage.getItem('_id');
                await axios.delete(`https://reqflow.onrender.com/info/deleteUser/${id}`);
                toast.success('Account deleted successfully!!');
                window.location.href = '/bio-data';
            } catch (error) {
                console.error("Error deleting account:", error);
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.message || 'Missing user-data '
                    console.log("axios", errorMessage);
                    toast.error(`${errorMessage}`);
                }
                alert("Failed to delete account. Please try again.");
            }
        }
    };

    const userData = async () => {
        const id = localStorage.getItem('_id');
        try {
            const userCrendentials = await axios.get(`https://reqflow.onrender.com/info/getUserProfile/${id}`);
            const profile = userCrendentials.data.bioProfile;
            setData(profile);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Missing user-data '
                console.log("axios", errorMessage);
                toast.error(`${errorMessage}`);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        userData();
    }, []);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const currentUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        try {
            const user = await axios.get("https://reqflow.onrender.com/auth/checkCurrentUser", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCheck(user.data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message;
                if (errorMessage || error.response?.status === 401) {
                    localStorage.clear();
                    toast.error('Session expired. Please login again');
                    router.push('/');
                } else {
                    console.error('Unknown Axios error', error);
                }
            } else {
                console.error('Non-Axios error', error);
            }
        }
    }, [router]);

    useEffect(() => {
        currentUser();
    }, [currentUser]);

    const checkSearchField = async (firstname: string): Promise<User[]> => {
        try {
            const token = localStorage.getItem('token');

            const res = await axios.get(`https://reqflow.onrender.com/info/search-field?firstname=${firstname}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data.search;
        } catch (error) {
            console.error("Error fetching search data:", error);
            throw error;
        }
    };

    const sendFriendRequest = async (id: string) => {
        const userDataRaw = localStorage.getItem('user-data');
        console.log(userDataRaw);

        const _id = localStorage.getItem('_id');
        const token = localStorage.getItem('token');

        if (!_id || !id) {
            toast.error('Missing user-data or recieverId in localStorage');
            return;
        }

        let profile;
        try {
            const userCrendentials = await axios.get(`https://reqflow.onrender.com/info/getUserProfile/${_id}`);
            profile = userCrendentials.data?.bioProfile;
        } catch (error) {
            toast.error('Error fetching user profile');
            console.error('Error:', error);
            return;
        }


        const obj = {
            userFirstName: profile?.firstname,
            userLastName: profile?.lastname,
            nickName: profile?.username,
            about: [
                {
                    profile: profile?.about[0].aboutYourself,
                    status: profile?.about[0].maritalStatus,
                    religion: profile?.about[0].religion
                }
            ],
            hobbies: [
                {
                    one: profile?.hobby[0].one,
                    two: profile?.hobby[0].two,
                    three: profile?.hobby[0].three
                }
            ],
            profile: [
                {
                    gender: profile?.profileInfo[0].gender,
                    country: profile?.profileInfo[0].country,
                    occupation: profile?.profileInfo[0].occupation,
                    age: profile?.profileInfo[0].age
                }
            ],
            reciever: id,
            approval: false
        }

        try {
            const friendReq = await axios.post(`https://reqflow.onrender.com/friend/sendRequest`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(friendReq, 'req-est');
            toast.success(`${friendReq.data.message}`);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Missing user-data or recieverId in localStorage'
                console.log("axios", errorMessage);
                toast.error(`${errorMessage}`);
            }
        }
    };

    const senderHandleRequest = async (id: string) => {
        try {
            const api = await axios.get(`https://reqflow.onrender.com/friend/seeSendRequet/${id}`);
            setRequest(api.data.client);
            // console.log(api.data.client);
            return api.data.client;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (check?._id) {
            senderHandleRequest(check._id);
        }
    }, [check]);


    return (
        <AppContext.Provider
            value={{
                userData,
                data,
                handleDeleteAccount,
                handleImageUpload,
                profileImage,
                uploading,
                triggerFileInput,
                fileInputRef,
                loading,
                currentUser,
                checkSearchField,
                sendFriendRequest,
                senderHandleRequest,
                request,
                check,
                setRequest
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};