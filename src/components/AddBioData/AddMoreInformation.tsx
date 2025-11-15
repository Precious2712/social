"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BioShadcnForm } from "./BioShadcnForm";
import { personalData, type userBioInfo } from "./BioSchema";
import { bioProfile } from "@/data/authFields/add-bio-data";
import type { Path } from "react-hook-form";
import axios from "axios"

export function AddMoreInformation() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // toast.success('Kindly refresh the page so your username and account will appear!!');

  const form = useForm<userBioInfo>({
    resolver: zodResolver(personalData),
    defaultValues: {
      firstname: "",
      lastname: "",
      profileInfo: [
        {
          gender: "",
          country: "",
          occupation: "",
          age: 0,
        },
      ],
      about: [
        {
          aboutYourself: "",
          religion: "",
          maritalStatus: "",
        },
      ],
      hobby: [
        {
          one: "",
          two: "",
          three: "",
        },
      ],
    },
  })

  async function onSubmit(values: userBioInfo) {
    const _id = localStorage.getItem('_id');
    const name = localStorage.getItem('username');

    console.log(_id);
    console.log(name);

    if (!_id || !name) {
      toast.error("User session data missing. Please log in again.");
      return;
    }

    const processedValues = {
      id: _id,
      username: name,
      firstname: values.firstname,
      lastname: values.lastname,
      profileInfo: [{
        gender: values.profileInfo[0].gender,
        country: values.profileInfo[0].country,
        occupation: values.profileInfo[0].occupation,
        age: Number(values.profileInfo[0].age) || 0
      }],
      about: [{
        aboutYourself: values.about[0].aboutYourself,
        religion: values.about[0].religion,
        maritalStatus: values.about[0].maritalStatus
      }],
      hobby: [{
        one: values.hobby[0].one,
        two: values.hobby[0].two,
        three: values.hobby[0].three
      }]
    };

    console.log("Submitting:", processedValues);
    setIsLoading(true);

    try {
      const response = await axios.post('https://reqflow.onrender.com/info/profile', processedValues);
      console.log("Success:", response.data);
      localStorage.setItem('user-data', JSON.stringify(response.data));
      // localStorage.setItem('updateUserId', response.data._id);
      const useres = response.data?._id
      console.log('local-starage-id', useres);
      toast.success("Thank you for updating your profile!! Your profile has been recieved");
      toast.success('Kindly refresh the page if you are getting an empty page, thank you!!');
      router.push('/home');
    } catch (error) {
      console.error("Error:", error);

      let errorMessage = "Failed to save profile";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
        console.log("axios", errorMessage);
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-[90%] lg:max-w-2xl mx-auto p-4">
      <Card className="backdrop-blur-sm bg-white/20 dark:bg-gray-800/80 border border-white/30 dark:border-gray-700 rounded-xl shadow-lg p-6">
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Your Profile</h2>
          <p className="text-gray-300 dark:text-gray-200 mt-2">
            Please fill in your personal information to complete your profile.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <BioShadcnForm control={form.control} {...bioProfile.firstname} name="firstname" />
                <BioShadcnForm control={form.control} {...bioProfile.lastname} name="lastname" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Profile Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bioProfile.profileInfo.map((field) => (
                  <BioShadcnForm
                    key={field.name}
                    control={form.control}
                    {...field}
                    name={`profileInfo.0.${field.name}` as Path<userBioInfo>}
                    valueAsNumber={field.name === "age"}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">About You</h3>
              <div className="grid grid-cols-1 gap-5">
                {bioProfile.about.map((field) => (
                  <BioShadcnForm
                    key={field.name}
                    control={form.control}
                    {...field}
                    name={`about.0.${field.name}` as Path<userBioInfo>}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Your Hobbies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {bioProfile.hobby.map((field) => (
                  <BioShadcnForm
                    key={field.name}
                    control={form.control}
                    {...field}
                    name={`hobby.0.${field.name}` as Path<userBioInfo>}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto min-w-[120px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Submit Profile"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}