"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedFormFieldProps {
  className?: string
  index: number
  children: React.ReactNode
}

export function AnimatedFormField({ className, index, children }: AnimatedFormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1 + index * 0.05,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}