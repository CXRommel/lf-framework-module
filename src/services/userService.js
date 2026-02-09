import { userClient } from "@/sdk/userClient";

const db = {
  collection: (collectionName) => {
    return {
      bulkWrite: (data) => {
        localStorage.setItem(collectionName, JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      },
    };
  },
};

function createAction(client, action, service) {
  return (...params) => {
    return client[action](params).then((result) => {
      service.onSuccess({ action, payload: result, params, db });
    });
  };
}

function createService(client, service) {
  let result = {};

  Object.keys(client).forEach((key) => {
    result[key] = createAction(client, key, service);
  });

  return result;
}

export const userService = {
  onSuccess: ({ action, payload, params, db }) => {
    console.log({ action, payload, params, db });
    switch (action) {
      case "getUsers":
        db.collection("users").bulkWrite(payload);
        break;
      case "createUser":
        // db.collection("users").insertOne(payload);
        break;
      case "updateUser":
        // db.collection("users").updateOne({ id: params.id }, payload);
        break;
      case "deleteUser":
        // db.collection("users").deleteOne({ id: params.id });
        break;
    }
  },
  onError: () => {},
};

const tt = createService(userClient, userService);
tt.getUsers();

// console.log(createService(userClient, userService));
