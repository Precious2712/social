'use client';

import { useAppContext } from "@/components/context/UseContext";
import { useState } from "react";
import { cardVariants, GetInitials } from "@/components/AddBioData/AnimationPropsComp";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Nav } from "@/components/NavBar/Nav";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export default function FriendRequestPage() {
  const [approval, setApproval] = useState(false);
  const { request, check, setRequest } = useAppContext();

  async function handleDeleteReq(id: string) {
    try {
      const res = await axios.delete(`https://reqflow.onrender.com/friend/rejectRequest/${id}`);
      toast.success('Friend request deleted successfully');

      setRequest(prev => {
        if (!prev) return null;
        return prev.filter((r) => r._id !== id);
      });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Network error';
        toast.error(errorMessage);
      }
    }
  }

  async function handlePutReq(id: string) {
    try {
      const update = await axios.put(`https://reqflow.onrender.com/friend/updateApprovalRequest/${id}`, {
        approval: true,
      });
      console.log(update);
      
      toast.success(`${check?.username} has accepted the friend request`);
      setRequest(prev => {
        if (!prev) return null;
        return prev.filter(r => r._id !== id);
      });

    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Network error';
        toast.error(errorMessage);
      }
    }
  }


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-4 pt-20 py-14">
        <div className="w-full max-w-2xl">
          <h2 className="text-white text-2xl mb-6 text-center">{check?.username} Friend Requests</h2>
          <div className="flex flex-col space-y-4">
            {(!request || request.length === 0) ? (
              <p className="text-white text-center text-lg">No friend requests yet.</p>
            ) : (
              request.map((req) => (
                <motion.div
                  key={req._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Card className="relative bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                              <AvatarImage src={localStorage.getItem('imageUrl') || "/placeholder.svg"} alt={req.userFirstName} />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                {GetInitials(`${req.userFirstName} ${req.userLastName || ""}`)}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                              {req.userFirstName} {req.userLastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">{req.profile[0].age} years old</p>
                            {req.profile[0].gender && req.profile[0].country && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {req.profile[0].gender}, {req.profile[0].country}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                          <Button onClick={() => handlePutReq(req._id)} className="cursor-pointer">Accept</Button>

                          <Button className="cursor-pointer" onClick={() => handleDeleteReq(req?._id)}>Reject</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </motion.div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}