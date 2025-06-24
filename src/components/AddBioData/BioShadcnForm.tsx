'use client';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";
import { FieldConfig } from "@/data/authFields/add-bio-data";

interface BioShadcnProps<T extends FieldValues> extends FieldConfig {
    control: Control<T>;
    name: Path<T>;
    valueAsNumber?: boolean;
}

export function BioShadcnForm<T extends FieldValues>({
    name,
    placeHolder,
    type,
    required,
    label,
    control,
    valueAsNumber = false,
}: BioShadcnProps<T>) {
    const renderField = () => {
        switch (type) {
            case "text":
            case "email":
            case "password":
                return (
                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[12px]">{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        type={type}
                                        placeholder={placeHolder}
                                        required={required}
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            case "number":
                return (
                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[12px]">{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder={placeHolder}
                                        required={required}
                                        value={field.value ?? ''}
                                        onChange={(e) => {
                                            const value = valueAsNumber 
                                                ? e.target.value === '' 
                                                    ? null 
                                                    : Number(e.target.value)
                                                : e.target.value;
                                            field.onChange(value);
                                        }}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            case "textarea":
                return (
                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[12px]">{label}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={placeHolder}
                                        required={required}
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            default:
                console.warn(`Unsupported field type: ${type}`);
                return null;
        }
    };

    return renderField();
}