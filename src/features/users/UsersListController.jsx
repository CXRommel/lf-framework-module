// import { useState, useEffect } from "react";
// import {
//   useAction,
//   useCollectionAction,
//   Query,
//   CollectionAction,
// } from "@/hooks";
// import { userService, notifyService, countryService } from "@/sdk";

import { UserList } from "./UserList";
// import { UserForm } from "./UserForm";
import { UsersLoader } from "./UsersLoader";

export const UsersListController = () => {
  return (
    <div>
      <UsersLoader onClick={() => {}} isLoading={false}>
        {({ filteredUsers }) => {
          return <UserList users={filteredUsers} onClick={() => {}} />;
        }}
      </UsersLoader>
    </div>
  );
};

// const ReactiveConfig = {
//   services: {
//     users: {
//       collection: userService.collection,
//       getUsers: userService.getUsers,
//       addUser: userService.addUser,
//       updateUser: userService.updateUser,
//       deleteUser: userService.deleteUser
//     },
//     countries: {
//       collection: countryService.collection,
//       getCountries: countryService.getCountries
//     }
//   }
// }

// export const withReactive = (Component, options) => {

//   const Wrapper = ({ ...props }) => {
//     const [data, setData] = useState({});
//     const [services, setServices] = useState({});
//     const [inits, setInits] = useState([]);

//     useEffect(() => {
//       setInits(options
//         .init({ services: ReactiveConfig.services, ...props })
//         .map((init, key) =>
//         {
//           return (<CollectionAction
//             key={key}
//             actionName={init.actionName}
//             collection={init.collection}
//             action={init.execute}
//             initialValue={init.initialValue}
//             setServices={setServices}
//           />)
//         }
//       ));
//     }, []);

//     return (<>
//         {inits}
//         {options.queries({ services: ReactiveConfig.services, ...props }).map((query) => (
//           <Query
//             key={query.name}
//             collection={query.collection}
//             name={query.name}
//             defaultValue={query.defaultValue}
//             where={query.where}
//             setData={setData}
//             />
//         ))}
//         <Component services={services} data={data} {...props} />
//       </>);
//   }

//   return Wrapper;
// }

// export const UsersListController = withReactive(
//   ({ data, services, monitors, onClick }) => {
//     const isLoading = false;//monitors.users.getUsers || monitors.users.addUser || monitors.countries.getCountries;

//     return (
//       <div>
//         <UserForm
//           countries={data.countries}
//           onSubmit={(user) => services?.users?.addUser(user) }
//         />
//         <UsersLoader onClick={services?.users?.getUsers} isLoading={isLoading}>
//           {
//             ({filteredUsers}) => {
//               return (<UserList
//                 users={filteredUsers}
//                 countries={data.countries}
//                 onClick={onClick}
//               />);
//             }
//           }
//         </UsersLoader>

//       </div>);
//   },
//   {
//     init: ({ services}) => [{
//       actionName: "countries.getCountries",
//       collection: services.countries.collection,
//       execute: services.countries.getCountries,
//       initialValue: []
//     },
//     {
//       actionName: "users.getUsers",
//       collection: services.users.collection,
//       execute: services.users.getUsers,
//       initialValue: []
//     }],
//     queries: ({ services }) => [
//       {
//         collection: services.countries.collection,
//         name: "countries",
//         defaultValue: []
//       },
//       {
//         collection: services.users.collection,
//         name: "users",
//         defaultValue: []
//       }
//     ],
//     monitors: ({ services }) => [
//       services.users.getUsers,
//       services.users.addUser,
//       services.countries.getCountries
//     ]
//   }
// );

// export const _UsersListContoller = ({ data, services, monitors, onClick }) => {
//   const isLoading =
//     monitors.users.getUsers ||
//     monitors.users.addUser ||
//     monitors.countries.getCountries;

//   return (
//     <div>
//       <UserForm
//         countries={data.countries}
//         onSubmit={(user) => services.users.addUser(user)}
//       />
//       <UsersLoader onClick={services.users.getUsers} isLoading={isLoading}>
//         {({ filteredUsers }) => {
//           return (
//             <UserList
//               users={filteredUsers}
//               countries={data.countries}
//               onClick={onClick}
//             />
//           );
//         }}
//       </UsersLoader>
//     </div>
//   );
// };

// export const UsersListController = ({ ...props }) => {
//   const [, usersLoading, usersExecute] = useCollectionAction({
//     action: userService.getUsers,
//     collection: userService.collection,
//     executeOnInit: false,
//     initialValue: [],
//     onSuccess: () => notifyService.success("Lista de usuario actualizada."),
//     onError: () =>
//       notifyService.error("Error al obtener la lista de usuarios."),
//   });

//   const [countries, countriesLoading] = useCollectionAction({
//     action: countryService.getCountries,
//     collection: countryService.collection,
//     executeOnInit: true,
//     initialValue: [],
//     onError: () => notifyService.error("Error al obtener la lista de países."),
//   });

//   const [newUserLoading, newUserExecute] = useAction({
//     action: userService.addUser,
//     onSuccess: ({ data }) => {
//       usersExecute();
//       notifyService.success(`Usuario ${data.name} agregado correctamente.`);
//     },
//     onError: () => notifyService.error("Error al agregar usuario."),
//   });

//   return (
//     <_UsersListContoller
//       {...props}
//       data={{ countries }}
//       services={{ users: { getUsers: usersExecute, addUser: newUserExecute } }}
//       monitors={{
//         users: { getUsers: usersLoading, addUser: newUserLoading },
//         countries: { getCountries: countriesLoading },
//       }}
//     />
//   );
// };

// export const _UsersListController = ({ onClick }) => {

//   const [, usersLoading, usersExecute] = useCollectionAction({
//     action: userService.getUsers,
//     collection: userService.collection,
//     executeOnInit: false,
//     initialValue: [],
//     onSuccess: () => notifyService.success("Lista de usuario actualizada."),
//     onError: () =>
//       notifyService.error("Error al obtener la lista de usuarios."),
//   });

//   const [countries, countriesLoading] = useCollectionAction({
//     action: countryService.getCountries,
//     collection: countryService.collection,
//     executeOnInit: true,
//     initialValue: [],
//     onError: () => notifyService.error("Error al obtener la lista de países."),
//   });

//   const [newUserLoading, newUserExecute] = useAction({
//     action: userService.addUser,
//     onSuccess: ({data}) => {
//       usersExecute();
//       notifyService.success(`Usuario ${data.name} agregado correctamente.`);
//     },
//     onError: () => notifyService.error("Error al agregar usuario."),
//   });

//   const [updateUserLoading, updateUserExecute] = useAction({
//     action: userService.updateUser,
//     executeOnInit: false,
//     onSuccess: ({data}) => {
//       usersExecute();
//       notifyService.success(`Usuario ${data.name} actualizado correctamente.`);
//     },
//     onError: () => notifyService.error("Error al actualizar usuario."),
//   });

//   const isLoading = usersLoading || countriesLoading || newUserLoading;

//   return (
//     <div>
//       <UserForm
//         countries={countries}
//         onSubmit={(user) => newUserExecute(user) }
//       />
//       <UsersLoader onClick={usersExecute} isLoading={isLoading} countries={countries}>
//         {
//           ({filteredUsers}) => {
//             return (<UserList
//               users={filteredUsers}
//               countries={countries}
//               onClick={onClick}
//             />);
//           }
//         }
//       </UsersLoader>

//     </div>
//   );
// };
