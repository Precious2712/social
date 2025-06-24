"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type userLogin } from "./AuthSchema";
import { Form } from "../ui/form";
import { LoginShadcn } from "../AuthShadcnProps/LoginShadcn";
import { login } from "@/data/authFields/login-auth";
import { AnimatedFormField } from "./AnimatedFormField";
import loginAnimation from '@/data/lotties/Animation - 1750065321286.json';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Dynamically import Lottie with no SSR
const LottieAnimation = dynamic(
    () => import('lottie-react'),
    { ssr: false }
);

export function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<userLogin>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    async function onSubmit(values: userLogin) {
        console.log(values)
        setIsLoading(true);
        try {
            const login = await axios.post('http://localhost:4000/auth/signIn', values);
            console.log('values', login);
            const id = login.data.userBio._id;
            localStorage.setItem('_id', id);
            const token = login.data.token;
            localStorage.setItem('token', token);
            const userName = login.data.userBio.username;
            localStorage.setItem('username', userName);
            setTimeout(() => {
                toast.success(`${login.data.user.name} is log in`);
            }, 6000);
            router.push('/bio-data');
        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage = 'Signup failed. Please try again.';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            toast.error(errorMessage, {
                duration: 4000,
                position: 'top-right',
            });
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 w-full max-w-6xl p-6">
                <div className="hidden lg:flex w-full lg:w-1/2 justify-center">
                    <Card className="w-full max-w-sm backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl flex items-center justify-center p-4">
                        <LottieAnimation
                            animationData={loginAnimation}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: 'auto' }}
                            className="max-h-[400px]"
                        />
                    </Card>
                </div>
                <div className="w-full lg:w-1/2">
                    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {login.map((field, index) => (
                                    <AnimatedFormField key={field.name} index={4 + index}>
                                        <LoginShadcn {...field} control={form.control} />
                                    </AnimatedFormField>
                                ))}

                                <Button className="cursor-pointer" type="submit">
                                    {isLoading ? 'Loading' : 'Sign in'}
                                </Button>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}