import { useState } from "react";
import { UsersListController } from "./UsersListController";

export const UsersListView = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>Users</li>
        </ul>
      </div>
      <UsersListController onClick={(user) => console.log(user)} />
    </div>
  );
};
