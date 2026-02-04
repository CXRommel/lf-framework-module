import { UserListItem } from "./UserListItem";

export const UserList = ({ users, countries, isLoading, onClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <UserListItem
              key={item.id}
              item={item}
              country={countries.find((c) => c.id === item.countryId)}
              onClick={onClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
