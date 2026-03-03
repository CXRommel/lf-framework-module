import { parentClient } from "@/sdk/parentClient";
import { createService } from "@/reactive";

export const parentsReactor = {
  onSuccess: ({ action, payload, params, db }) => {
    switch (action) {
      case "getParentsByStudentId":
        db.collection("parents").bulkCreateOrUpdate(payload);
        break;
    }
  },
  onError: () => {},
};

export const parentsService = createService(parentClient, parentsReactor);
