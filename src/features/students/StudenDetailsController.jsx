import { withReactive } from "@/reactive";

import { StudentDetails } from "./StudentDetails";

export const StudentDetailsController = withReactive(
  ({ data, services, monitors, onClick }) => {
    if (monitors.getStudentById) {
      return (
        <div className="flex justify-center items-center p-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      );
    }

    return (
      <StudentDetails
        student={data.students?.[0]}
        parents={data.parents ?? []}
        services={services}
        monitors={monitors}
        onClick={onClick}
      />
    );
  },
  {
    init: ({ services, id }) => {
      services.students.getStudentById(id);
      services.parents.getParentsByStudentId(id);
    },
    queries: ({ id }) => [
      {
        collection: "students",
        name: "students",
        where: {
          field: "id",
          op: "==",
          value: id,
        },
      },
      {
        collection: "parents",
        name: "parents",
        where: {
          field: "studentId",
          op: "==",
          value: id,
        },
      },
    ],
    monitors: () => ["getStudentById"],
  },
);
