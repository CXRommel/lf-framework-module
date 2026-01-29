function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const userService = {
    getUsers: async () => {
        await sleep(RandomInt(1000, 5000));

        return [{
            id: 1,
            name: "John Doe",
            country: "United States",
            position: "Developer",
            description: "Desktop Developer",
            avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Eliza",
            email: "john.doe@example.com",
            phone: "123-456-7890",
        },
        {
            id: 2,
            name: "Jane Doe",
            country: "United States",
            position: "Designer",
            description: "Web Designer",
            avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Valentina",
            email: "jane.doe@example.com",
            phone: "123-456-7890",
        }]
    },

    getUserById: (id) => {},
    updateUser: (user) => {},
    deleteUser: (id) => {},
};