function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const parentsTable = [
  {
    id: 1,
    name: "John Doe",
    studentId: 1,
  },
  {
    id: 2,
    name: "Jane Doe",
    studentId: 1,
  },
  {
    id: 3,
    name: "Alice Smith",
    studentId: 2,
  },
  {
    id: 4,
    name: "Bob Johnson",
    studentId: 3,
  },
];

export const parentClient = {
  getParentsByStudentId: async (id) => {
    await sleep(RandomInt(500, 2000));
    const parents = parentsTable.filter((item) => item.studentId === id);
    return parents;
  },
};
