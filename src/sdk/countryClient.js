function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const countryClient = {
  getCountries: async () => {
    await sleep(RandomInt(1000, 2000));

    return [
      {
        id: 1,
        name: "United States",
      },
      {
        id: 2,
        name: "Canada",
      },
      {
        id: 3,
        name: "Mexico",
      },
    ];
  },
};
