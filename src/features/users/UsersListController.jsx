import { UserList } from "./UserList";

import { LoadingButton } from "@/components";
import { useAction } from "@/hooks";
import { userService, notifyService } from "@/services";

export const UsersListController = ({ onClick }) => {
    const [users, usersLoading, usersExecute, usersError] = useAction({ 
        action: userService.getUsers,
        key: 'users', 
        executeOnInit: false,
        initialValue: [],
        onSuccess: () => notifyService.success('Lista de usuario actualizada.'),
        onError: () => notifyService.error('Error al obtener la lista de usuarios.'),
    });

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">Lista de Usuarios</div>
                <LoadingButton label="Actualizar" isLoading={usersLoading} onClick={usersExecute} />
            </div>
            <UserList data={users} isLoading={usersLoading} onClick={onClick} />
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


