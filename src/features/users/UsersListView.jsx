import { UsersListController } from "./UsersListController";

export const UsersListView = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a>Home</a></li>
                    <li>Users</li>
                </ul>
            </div>
            <UsersListController onClick={(user) => console.log(user)} />
        </div>
    );
}