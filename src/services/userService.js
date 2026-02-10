import { userClient } from "@/sdk/userClient";
import { createService } from "@/reactive";

export const userReactor = {
  onSuccess: ({ action, payload, params, db }) => {
    switch (action) {
      case "getUsers":
        db.collection("users").bulkWrite(payload);
        break;
      case "addUser":
        db.collection("users").insertOne(payload);
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

export const userService = createService(userClient, userReactor);
