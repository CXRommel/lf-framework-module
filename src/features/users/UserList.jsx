import { UserListItem } from "./UserListItem";

export const UserList = ({ data, isLoading, onClick }) => {
    return (<div className="overflow-x-auto">
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
                    {data.map((item) => (
                        <UserListItem key={item.id} item={item} onClick={onClick} />
                    ))}
                </tbody>
            </table>
        </div>)
}