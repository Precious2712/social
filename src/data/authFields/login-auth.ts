"use client"

export interface loginField {
  name: string
  type: string
  label: string
  placeholder: string
  required: boolean
}

export const login: loginField[] = [
  {
    name: "username",
    type: "text",
    label: "User name",
    placeholder: "Enter user name",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    required: true,
  }
]