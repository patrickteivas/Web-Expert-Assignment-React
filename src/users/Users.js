import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usersEndpoint } from '../constants';
import Email from '../common/Email';
import Website from '../common/Website';

Users.propTypes = {
  openModalForUserId: PropTypes.func.isRequired,
};

function Users({ openModalForUserId }) {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState('');

  const showUserBasedOnSearch = (user) => {
    if (!search) {
      return true;
    }

    const normalizedSearch = search.toLowerCase().trim();
    const { name } = user;

    return name.toLowerCase().includes(normalizedSearch);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_USER_API}${usersEndpoint}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col" className="d-none d-lg-table-cell">Username</th>
              <th scope="col" className="d-none d-sm-table-cell">Email</th>
              <th scope="col" className="d-none d-md-table-cell">Website</th>
              <th scope="col" className="d-none d-lg-table-cell">Company Name</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id} hidden={!showUserBasedOnSearch(user)}>
                <th scope="row">{user.id}</th>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => openModalForUserId(user.id)}
                  >
                    {user.name}
                  </button>
                </td>
                <td className="d-none d-lg-table-cell">{user.username}</td>
                <td className="d-none d-sm-table-cell"><Email user={user} /></td>
                <td className="d-none d-md-table-cell"><Website user={user} /></td>
                <td className="d-none d-lg-table-cell">{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
