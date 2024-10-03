import DeleteUser from "./DeleteUser";

const UsersTable = ({ users }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Username</th>
          <th>Role</th>
          <th className="user__email">Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 &&
          users.map((user) => (
            <tr key={user._id}>
              <td>
                <img
                  className="users__img"
                  src={
                    user?.googleId
                      ? user.profilePic
                      : `${import.meta.env.VITE_BACKEND_URL}/${user.profilePic}`
                  }
                  alt={user.username}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td className="user__email ellipsis">{user.email}</td>
              <td>
                <DeleteUser userId={user._id} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
