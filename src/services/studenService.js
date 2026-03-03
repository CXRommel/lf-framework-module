import { studentClient } from "@/sdk/studentClient";
import { createService } from "@/reactive";

export const studentReactor = {
  onSuccess: ({ action, payload, params, db }) => {
    switch (action) {
      case "getStudents":
        db.collection("students").bulkWrite(payload);
        break;
      case "getStudentById":
        db.collection("students").createOrUpdate(payload);
        break;
    }
  },
  onError: () => {},
};

export const studentService = createService(studentClient, studentReactor);
