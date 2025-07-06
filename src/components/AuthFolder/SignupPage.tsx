"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { chatMessages } from "@/data/chats/chat-msg"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpFormSchema, type userSignup } from "./AuthSchema"
import { Form } from "../ui/form"
import { SignupShadcn } from "../AuthShadcnProps/SignupShadcn"
import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<userSignup>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: userSignup) {
    console.log(values);
    setIsLoading(true);
    try {
      const signIn = await axios.post('http://localhost:4000/auth/signUp', values);
      console.log('values', signIn);
      setTimeout(() => {
        toast.success('congratulations you have successfully register your account');
      }, 6000);
      router.push('/login');
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
          <Card className="w-full max-w-sm backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Avatar className="w-8 h-8 border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-purple-500 text-white text-xs">S</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-blue-500 text-white text-xs">M</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-green-500 text-white text-xs">A</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Team Chat</h3>
                  <p className="text-white/60 text-xs">4 members online</p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4 h-80 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs">
                      {msg.user[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"} max-w-[70%]`}>
                    <div
                      className={`px-3 py-2 rounded-2xl ${msg.isOwn ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-white/20 text-white"
                        }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <span className="text-xs text-white/50 mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-orange-500 text-white text-xs">J</AvatarFallback>
                </Avatar>
                <div className="bg-white/20 px-3 py-2 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm"
                  disabled
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-1/2">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl p-6">
            <h1 className="text-center text-2xl">Fill in the details</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <SignupShadcn
                  name="username"
                  label="username"
                  type="username"
                  required={true}
                  placeholder="Enter user name"
                  control={form.control}
                />

                <SignupShadcn
                  name="password"
                  label="password"
                  type="password"
                  required={true}
                  placeholder="Enter user name"
                  control={form.control}
                />

                <Button className="cursor-pointer" type="submit">
                  {isLoading ? 'Loading' : 'Sign up'}
                </Button>
              </form>
              <Link href='/login'>
                <p className="text-center text-xs underline-offset-1 lg:text-[16px]">Already have an account! click to log in</p>
              </Link>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}