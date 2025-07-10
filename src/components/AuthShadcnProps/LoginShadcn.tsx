"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";
import { userLogin } from "../AuthFolder/AuthSchema";
import { loginField } from "@/data/authFields/login-auth"; 

interface LoginShadcnProps extends loginField {
  control: Control<userLogin>;
}

export function LoginShadcn({
  name,
  placeholder,
  type,
  required,
  label,
  control,
}: LoginShadcnProps) {
  const [show, setShow] = useState(false);

  const handlePasswordToggle = () => setShow((prev) => !prev);

  const renderField = () => {
    switch (type) {
      case "text":
        return (
          <FormField
            control={control}
            name={name as keyof userLogin}
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

      case "password":
        return (
          <FormField
            control={control}
            name={name as keyof userLogin}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={show ? "text" : "password"}
                      placeholder={placeholder}
                      required={required}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={handlePasswordToggle}
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