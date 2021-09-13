import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../../config/api';

const TableUser = () => {
  let { data: users } = useQuery('usersCache', getUsers);

  users = users?.filter((data) => data.email !== 'adminwaysbucks@gmail.com');

  return (
    <>
      <title>WaysBucks | User</title>
      <section className="income-transaction">
        <div class="container">
          <h1 className="mb-3">Users WaysBucks</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Total Order</th>
                <th scope="col">Chat</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr>
                    <td scope="col">{index + 1}</td>
                    <td scope="col">{user.fullname}</td>
                    <td scope="col">{user.email}</td>
                    <td scope="col">{user.transactions.length}</td>
                    <Link to={`/admin/user/${user.id}`}>
                      <td scope="col">go chat</td>
                    </Link>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default TableUser;
