import { useState } from "react";
import { UserList } from "./UserList";
import { UserForm } from "./UserForm";

import { LoadingButton } from "@/components";
import { useAction, useCollectionAction, useQuery } from "@/hooks";
import { userService, notifyService, countryService } from "@/services";

export const UsersListController = ({ onClick }) => {

  const [, usersLoading, usersExecute] = useCollectionAction({
    action: userService.getUsers,
    collection: "users",
    executeOnInit: false,
    initialValue: [],
    onSuccess: () => notifyService.success("Lista de usuario actualizada."),
    onError: () =>
      notifyService.error("Error al obtener la lista de usuarios."),
  });

  const [countries, countriesLoading] = useCollectionAction({
    action: countryService.getCountries,
    collection: "countries",
    executeOnInit: true,
    initialValue: [],
    onError: () => notifyService.error("Error al obtener la lista de países."),
  });

  const [newUserLoading, newUserExecute] = useAction({
    action: userService.addUser,
    onSuccess: ({data}) => {
      usersExecute();
      notifyService.success(`Usuario ${data.name} agregado correctamente.`); 
    },
    onError: () => notifyService.error("Error al agregar usuario."),
  });

  const [updateUserLoading, updateUserExecute] = useAction({
    action: userService.updateUser,
    executeOnInit: false,
    onSuccess: ({data}) => {
      usersExecute();
      notifyService.success(`Usuario ${data.name} actualizado correctamente.`); 
    },
    onError: () => notifyService.error("Error al actualizar usuario."),
  });

  return (
    <div>
      <UserForm
        countries={countries}
        onSubmit={(user) => newUserExecute(user) }
      />
      <UsersLoader onClick={usersExecute} isLoading={usersLoading || countriesLoading} countries={countries}>
        {
          ({filteredUsers}) => {
            return (<UserList
              users={filteredUsers}
              countries={countries}
              onClick={onClick}
            />);
          }
        }
      </UsersLoader>
      
    </div>
  );
};

export const UsersLoader = ({isLoading, onClick, children }) => {
  const [search, setSearch] = useState("");
  const users = useQuery({
    collection: "users",
    where: {
      field: "name",
      op: "contains",
      value: search
    }
  });

  return (<div>
    <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Lista de Usuarios</div>
        <input type="text" className="input" onChange={(e) => setSearch(e.target.value)} />
        <LoadingButton
          label="Actualizar"
          isLoading={isLoading}
          onClick={onClick}
        />
      </div>
    {children({ filteredUsers: users })}
  </div>)
  
}