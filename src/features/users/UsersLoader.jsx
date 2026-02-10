import { useState } from "react";

import { LoadingButton } from "@/components";
import { useQuery } from "@/hooks";

export const UsersLoader = ({ isLoading, onClick, children }) => {
  const [search, setSearch] = useState("");
  const users = useQuery({
    collection: "users",
    where: {
      field: "name",
      op: "contains",
      value: search,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Lista de Usuarios</div>
        <input
          type="text"
          className="input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <LoadingButton
          label="Actualizar"
          isLoading={isLoading}
          onClick={onClick}
        />
      </div>
      {children({ filteredUsers: users })}
    </div>
  );
};
