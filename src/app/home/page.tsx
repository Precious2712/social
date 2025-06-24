"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, Users, Heart } from "lucide-react"
import { useAppContext } from "@/components/context/UseContext"
import toast from "react-hot-toast"
import { User } from "@/data/authFields/user"
import { GetInitials, containerVariants, itemVariants, cardVariants, pulseVariants, FirstNameComp, HeaderComp } from "@/components/AddBioData/AnimationPropsComp"
import { Nav } from "@/components/NavBar/Nav"

export default function FriendSearch() {
  const { checkSearchField, sendFriendRequest } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  async function handleSearch(firstname: string) {
    if (!firstname.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    setSearchError(null)

    try {
      const data = await checkSearchField(firstname)
      setSearchResults(data || []);
      console.log('gotten-data', data);
      const recieverId = data[0].id
      localStorage.setItem('recieverId', recieverId);

      if (data && data.length > 0) {
        toast.success('Results found')
      } else {
        toast.error('No results found')
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchError('Failed to search for users. Please try again.')
      toast.error('Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br text from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden py-20">
        <HeaderComp />

        <motion.div
          className="max-w-2xl mx-auto p-6 space-y-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              >
                <Heart className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find Your People
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect with friends and discover new connections
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg flex">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for friends..."
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(firstname)
                  }
                }}
                className="pl-12 h-14 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
              />
              <Button
                onClick={() => handleSearch(firstname)}
                disabled={!firstname.trim() || isLoading}
                className="m-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="loading"
                >
                  <motion.div
                    className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.p
                    className="text-muted-foreground"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Finding your friends...
                  </motion.p>
                </motion.div>
              )}

              {!isLoading && firstname && searchResults.length === 0 && !searchError && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="no-results"
                >
                  <motion.div
                    className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-fit mx-auto mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">No friends found</h3>
                  <p className="text-muted-foreground">No users found with the name "{firstname}"</p>
                </motion.div>
              )}

              {searchError && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key="error"
                >
                  <div className="p-4 bg-red-100 rounded-full w-fit mx-auto mb-4">
                    <Users className="h-12 w-12 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600">Search Error</h3>
                  <p className="text-red-500">{searchError}</p>
                </motion.div>
              )}

              {!isLoading && searchResults.length > 0 && (
                <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="results">
                  <motion.h2
                    className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Found {searchResults.length} friend{searchResults.length !== 1 ? "s" : ""}
                  </motion.h2>
                  <AnimatePresence>
                    {searchResults.map((user, index) => (
                      <motion.div
                        key={user.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 300 },
                        }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Card className="relative bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <motion.div
                                  className="relative"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                                    <AvatarImage src={localStorage.getItem('imageUrl') || "/placeholder.svg"} alt={user.firstname} />
                                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                      {GetInitials(`${user.firstname} ${user.lastname || ""}`)}
                                    </AvatarFallback>
                                  </Avatar>
                                </motion.div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-800">
                                      {user.firstname} {user.lastname}
                                    </h3>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{user.profileInfo[0].age}</p>
                                  {user.profileInfo[0].gender && user.profileInfo[0].country && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {user.profileInfo[0].gender}, {user.profileInfo[0].country}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <Button className="bg-blue-500 cursor-pointer" onClick={() => sendFriendRequest(user.id)}>
                                Add Friend
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {!firstname && (
                <FirstNameComp />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}