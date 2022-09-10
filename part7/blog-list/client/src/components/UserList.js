import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import userService from "../services/users";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <>
      <h2 className="text-2xl mb-8">Users</h2>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Blogs Created</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row
              key={user.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <Link
                  to={`/users/${user.id}`}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.blogs?.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default UserList;
