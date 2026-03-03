const ParentCard = ({ parent }) => (
  <div className="bg-base-200 border border-base-300 rounded-box p-4 flex items-center gap-3">
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content mask mask-squircle h-10 w-10">
        <span className="text-lg">{parent.name?.[0]?.toUpperCase()}</span>
      </div>
    </div>
    <div>
      <div className="font-bold">{parent.name}</div>
      <div className="text-sm opacity-60">ID: {parent.studentId}</div>
    </div>
  </div>
);

export const StudentDetails = ({ student, parents }) => {
  return (
    <div className="card bg-base-100 border border-base-300 rounded-box shadow-sm">
      <div className="card-body gap-6">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="mask mask-squircle h-20 w-20">
              <img src={student?.avatar} alt={`${student?.name} avatar`} />
            </div>
          </div>
          <div>
            <h1 className="card-title text-2xl">{student?.name}</h1>
            <span className="badge badge-ghost">{student?.position}</span>
          </div>
        </div>

        <div className="divider my-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold opacity-50 uppercase tracking-wider">
              Email
            </span>
            <span className="text-sm">{student?.email}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold opacity-50 uppercase tracking-wider">
              Phone
            </span>
            <span className="text-sm">{student?.phone}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold opacity-50 uppercase tracking-wider">
              Country
            </span>
            <span className="text-sm">{student?.countryId}</span>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <span className="text-xs font-semibold opacity-50 uppercase tracking-wider">
              Description
            </span>
            <span className="text-sm">{student?.description}</span>
          </div>
        </div>

        {parents?.length > 0 && (
          <>
            <div className="divider my-0" />
            <div>
              <h2 className="font-bold text-lg mb-3">Parents</h2>
              <div className="flex flex-col gap-2">
                {parents.map((parent) => (
                  <ParentCard key={parent.id} parent={parent} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
