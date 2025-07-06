"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, Briefcase, Heart, Users } from "lucide-react"
import { Nav } from "../NavBar/Nav"
import axios, { isAxiosError } from "axios"
import toast from "react-hot-toast"

interface ProfileData {
  country: string
  occupation: string
  aboutYourself: string
  religion: string
  maritalStatus: string
  one: string
  two: string
  three: string
}

export default function ProfileUpdateForm() {
  const [formData, setFormData] = useState<ProfileData>({
    country: "",
    occupation: "",
    aboutYourself: "",
    religion: "",
    maritalStatus: "",
    one: "",
    two: "",
    three: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const maritalStatuses = ["single", "married", "divorced", "widowed", "separated", "In a relationship"]

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const id = localStorage.getItem('_id');

      const response = await axios.put(
        `http://localhost:4000/info/update-info/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('update-user-information', response);
      toast.success('You have successfully updated your profile');
    } catch (error) {
      console.error("Error updating profile:", error);
      if (isAxiosError(error)) {
        const errMsg = 'An error has ocured'
        toast.error(`${errMsg || error.response}`);
      }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFields = () => {
    setFormData({
      country: "",
      occupation: "",
      aboutYourself: "",
      religion: "",
      maritalStatus: "",
      one: "",
      two: "",
      three: "",
    });
  };


  return (
    <div className="pb-3">
      <Nav />
      <div className="pt-4 max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2 mt-16">
          <h1 className="text-3xl font-bold">Update Your Profile</h1>
          <p className="text-muted-foreground">Keep your profile information up to date</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Your location and professional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="e.g. United States"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Occupation
                  </Label>
                  <Input
                    id="occupation"
                    placeholder="e.g. Software Engineer"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                About You
              </CardTitle>
              <CardDescription>Tell others about yourself and your background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutYourself">About Yourself</Label>
                <Textarea
                  id="aboutYourself"
                  placeholder="Tell us about yourself, your interests, goals, and what makes you unique..."
                  className="min-h-[100px]"
                  value={formData.aboutYourself}
                  onChange={(e) => handleInputChange("aboutYourself", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Input
                    id="religion"
                    placeholder="e.g. Christianity"
                    value={formData.religion}
                    onChange={(e) => handleInputChange("religion", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Marital Status
                  </Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      {maritalStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hobbies & Interests</CardTitle>
              <CardDescription>Share your top 3 hobbies or interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hobby1">Hobby 1</Label>
                  <Input
                    id="hobby1"
                    placeholder="e.g. Reading"
                    value={formData.one}
                    onChange={(e) => handleInputChange("one", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobby2">Hobby 2</Label>
                  <Input
                    id="hobby2"
                    placeholder="e.g. Photography"
                    value={formData.two}
                    onChange={(e) => handleInputChange("two", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobby3">Hobby 3</Label>
                  <Input
                    id="hobby3"
                    placeholder="e.g. Cooking"
                    value={formData.three}
                    onChange={(e) => handleInputChange("three", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button className="cursor-pointer" onClick={deleteFields} type="button" variant="outline">
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}