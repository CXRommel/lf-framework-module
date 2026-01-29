export const UserListItem = ({ item, onClick }) => {
    return (
        <tr onClick={() => onClick(item)}>
            <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                    <img
                    src={item.avatar}
                    alt="avatar" />
                </div>
                </div>
                <div>
                <div className="font-bold">{item.name}</div>
                <div className="text-sm opacity-50">{item.country}</div>
                </div>
            </div>
            </td>
            <td>
            {item.position}
            <br />
            <span className="badge badge-ghost badge-sm">{item.description}</span>
            </td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
        </tr>
    );
}