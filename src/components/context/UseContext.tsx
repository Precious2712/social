'use client';

import { portfolio } from '@/data/authFields/data-types';
import axios from 'axios';
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
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

            let response = await axios.put(`http://localhost:4000/auth/upload/${id}`, image);
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
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const id = localStorage.getItem('_id');
                await axios.delete(`http://localhost:4000/info/deleteUser/${id}`);
                window.location.href = '/';
            } catch (error) {
                console.error("Error deleting account:", error);
                alert("Failed to delete account. Please try again.");
            }
        }
    };

    const userData = async () => {
        const id = localStorage.getItem('_id');
        try {
            const userCrendentials = await axios.get(`http://localhost:4000/info/getUserProfile/${id}`);
            const profile = userCrendentials.data.bioProfile;
            setData(profile);
        } catch (error) {
            console.log(error);
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

    const currentUser = async () => {
        const token = localStorage.getItem('token');

        try {
            const user = await axios.get("http://localhost:4000/auth/checkCurrentUser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCheck(user.data.data);
            console.log("user-data", user.data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message;
                console.log("axios", errorMessage);

                if (errorMessage) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('_id');
                    localStorage.removeItem('user-data');
                    toast.error('Token expired. Please login again');
                    router.push('/');
                } else if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    toast.error('Session expired. Please login again');
                    router.push('/');
                } else {
                    console.log('Unknown Axios error', error);
                }
            } else {
                console.log('Non-Axios error', error);
            }
        }
    };

    useEffect(() => {
        currentUser();
    }, []);

    const checkSearchField = async (firstname: string): Promise<User[]> => {
        try {
            const token = localStorage.getItem('token');

            const res = await axios.get(`http://localhost:4000/info/search-field?firstname=${firstname}`, {
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
        // const recipient = localStorage.getItem('recieverId');
        const token = localStorage.getItem('token');

        if (!userDataRaw || !id) {
            console.warn('Missing user-data or recieverId in localStorage');
            return;
        }

        const send = JSON.parse(userDataRaw);

        const profileInfo = send?.data?.profileInfo?.[0] || {};
        const aboutInfo = send?.data?.about?.[0] || {};
        const hobbyInfo = send?.data?.hobby?.[0] || {};
        const profileMain = send?.data?.profileInfo?.[0] || {};

        const obj = {
            userFirstName: send?.data?.firstname || '',
            userLastName: send?.data?.lastname || '',
            nickName: send?.data?.username || '',
            about: [
                {
                    profile: aboutInfo.aboutYourself || '',
                    status: aboutInfo.maritalStatus || '',
                    religion: aboutInfo.religion || ''
                }
            ],
            hobbies: [
                {
                    one: hobbyInfo.one || '',
                    two: hobbyInfo.two || '',
                    three: hobbyInfo.three || ''
                }
            ],
            profile: [
                {
                    gender: profileInfo.gender || '',
                    country: profileInfo.country || '',
                    occupation: profileMain.occupation || '',
                    age: profileInfo.age || ''
                }
            ],
            reciever: id,
            approval: false
        };

        console.log("schema-obj", obj);

        try {
            const friendReq = await axios.post(`http://localhost:4000/friend/sendRequest`, obj, {
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
                toast.error(`${errorMessage}`)
            }
        }
    };

    const senderHandleRequest = async (id: string) => {
        try {
            const api = await axios.get(`http://localhost:4000/friend/seeSendRequet/${id}`);
            setRequest(api.data.client);
            console.log(api.data.client);
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
                check
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