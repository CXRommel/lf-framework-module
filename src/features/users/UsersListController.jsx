import { UserList } from "./UserList";
import { UserForm } from "./UserForm";

import { LoadingButton } from "@/components";
import { useAction, useKeyAction } from "@/hooks";
import { userService, notifyService, countryService } from "@/services";

export const UsersListController = ({ onClick }) => {

  // const value = useQuery('users', { byId: 1 });

  const [users, usersLoading, usersExecute] = useKeyAction({
    action: userService.getUsers,
    key: "users",
    executeOnInit: false,
    initialValue: [],
    onSuccess: () => notifyService.success("Lista de usuario actualizada."),
    onError: () =>
      notifyService.error("Error al obtener la lista de usuarios."),
  });

  const [countries, countriesLoading] = useKeyAction({
    action: countryService.getCountries,
    key: "countries",
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

  return (
    <div>
      <UserForm
        countries={countries}
        onSubmit={(user) => newUserExecute(user) }
      />
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Lista de Usuarios</div>
        <LoadingButton
          label="Actualizar"
          isLoading={usersLoading || countriesLoading}
          onClick={usersExecute}
        />
      </div>
      <UserList
        users={users}
        countries={countries}
        isLoading={usersLoading || countriesLoading}
        onClick={onClick}
      />
    </div>
  );
};

// export const UsersListController = () => {

//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         handleUpdateData();
//     }, []);

//     const handleUpdateData = useCallback(() => {
//         setLoading(true);
//         userService.getUsers().then((users) => {
//             setUsers(users);
//             setLoading(false);

//             notifyService.success('Lista de usuario actualizada.');
//         });
//     }, []);

//     return (
//         <_UsersListController
//             services={{ users: userService }}
//             data={{ users }}
//             monitors={{ users: { getUsers: loading } }} />
//     );
// }
