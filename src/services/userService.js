function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const usersTable = [
  {
    id: 1,
    name: "John Doe",
    countryId: 1,
    position: "Developer",
    description: "Desktop Developer",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Eliza",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Doe",
    countryId: 2,
    position: "Designer",
    description: "Web Designer",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Valentina",
    email: "jane.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 3,
    name: "Alice Smith",
    countryId: 3,
    position: "Manager",
    description: "Project Manager",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alicia",
    email: "alice.smith@example.com",
    phone: "123-456-7890",
  },
];

export const userService = {
  getUsers: async () => {
    await sleep(RandomInt(1000, 5000));
    return usersTable;
  },
  addUser: async (user) => {
    await sleep(RandomInt(500, 2000));
    const newUser = { ...user, id: usersTable.length + 1 };
    usersTable.push(newUser);
    return newUser;
  },
  getUserById: (id) => {},
  updateUser: async (user) => {
    await sleep(RandomInt(500, 2000));
    const index = usersTable.findIndex((item) => item.id === user.id);
    usersTable[index] = user;
    return user;
  },
  deleteUser: (id) => {},
};
