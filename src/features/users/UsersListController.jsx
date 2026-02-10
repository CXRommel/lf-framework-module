import { withReactive } from "@/reactive";

import { UserList } from "./UserList";
import { UserForm } from "./UserForm";
import { UsersLoader } from "./UsersLoader";

export const UsersListController = withReactive(
  ({ data, services, monitors, onClick }) => {
    const isLoading =
      monitors.getUsers || monitors.addUser || monitors.getCountries;

    return (
      <div>
        <UserForm
          countries={data.countries}
          onSubmit={(user) => services.users.addUser(user)}
        />
        <UsersLoader onClick={services.users.getUsers} isLoading={isLoading}>
          {({ filteredUsers }) => {
            return (
              <UserList
                users={filteredUsers}
                countries={data.countries}
                onClick={onClick}
              />
            );
          }}
        </UsersLoader>
      </div>
    );
  },
  {
    init: ({ services }) => {
      services.countries.getCountries();
      services.users.getUsers();
    },
    queries: ({}) => [
      {
        collection: "countries",
        name: "countries",
        defaultValue: [],
      },
      {
        collection: "users",
        name: "users",
        defaultValue: [],
      },
    ],
    monitors: ({}) => ["getUsers", "addUser", "getCountries"],
  },
);
