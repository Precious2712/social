'use client';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { userSignup } from "../AuthFolder/AuthSchema";
import { Input } from "../ui/input";


type signupFieldRenderedProps = {
    name: keyof userSignup;
    placeholder: string;
    type: string;
    required: boolean;
    label: string;
    control: Control<userSignup>;
};


export function SignupShadcn({
    name,
    placeholder,
    type,
    required,
    label,
    control
}: signupFieldRenderedProps) {
    const [show, setShow] = useState(false);
    const handlePassword = () => {
        setShow(!show)
    }
    const renderField = () => {
        switch (type) {
            case 'username':
                return (
                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder={placeholder}
                                        required={required}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>We’ll never share your email.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            case 'password':
                return (
                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={show ? 'text' : 'password'}
                                            placeholder={placeholder}
                                            required={required}
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={handlePassword}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                        >
                                            {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormDescription>Password must be secure.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            default:
                return null;
        }
    };

    return renderField();
}