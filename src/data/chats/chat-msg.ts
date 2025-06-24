interface chatBox {
    id: number,
    user: string,
    avatar: string,
    message: string,
    time: string,
    isOwn: boolean
}

export const chatMessages: chatBox[] = [
    {
        id: 1,
        user: "Sarah",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "Hey everyone! Just joined the team 🎉",
        time: "2:30 PM",
        isOwn: false,
    },
    {
        id: 2,
        user: "Mike",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "Welcome Sarah! Excited to work with you",
        time: "2:32 PM",
        isOwn: false,
    },
    {
        id: 3,
        user: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "Looking forward to collaborating!",
        time: "2:35 PM",
        isOwn: true,
    },
    {
        id: 4,
        user: "Alex",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "The project launch went amazing! 🚀",
        time: "3:15 PM",
        isOwn: false,
    },
]