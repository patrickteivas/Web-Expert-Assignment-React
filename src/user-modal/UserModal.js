import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { usersEndpoint } from '../constants';
import { Modal } from 'bootstrap';
import KeyComponentOrValue from './KeyComponentOrValue';

UserModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openedUserId: PropTypes.number.isRequired,
};

const mapKeyToLabel = {
  id: '#',
  name: 'Name',
  username: 'Username',
  email: 'Email',
  address: 'Address',
  phone: 'Phone',
  website: 'Website',
};

const mapCompanyKeyToLabel = {
  name: 'Name',
  catchPhrase: 'Catch Phrase',
  bs: 'Bs',
};

function UserModal({ closeModal, openedUserId }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  const modalEl = useRef(null);
  const modal = useRef(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_USER_API}${usersEndpoint}/${openedUserId}`)
      .then((response) => response.json())
      .then((data) => {
        const { company, ...baseData } = data;
        setUser(baseData);
        setCompany(company);
      })
      .catch((error) => console.log(error));
  }, [openedUserId]);

  useEffect(() => {
    const hiddenListener = () => {
      modalEl.current.removeEventListener('hidden.bs.modal', hiddenListener);
      modalEl.current = null;
      modal.current = null;
      closeModal();
    };

    if (!modal.current) {
      modal.current = new Modal(modalEl.current);
      modalEl.current.addEventListener('hidden.bs.modal', hiddenListener);
    }

    modal.current.show();
  });

  return (
    <div
      className="modal fade hide"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      ref={modalEl}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{user?.name}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <tbody>
                    {user && Object.keys(user).map((key) => (
                      <tr key={`${user.id}-${key}`}>
                        <th scope="row">{mapKeyToLabel[key]}</th>
                        <td><KeyComponentOrValue user={user} fieldKey={key} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-3">
              <h6>Company</h6>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <tbody>
                    {company && Object.entries(company).map(([key, value]) => (
                      <tr key={`${user.id}-company-${key}`}>
                        <th scope="row">{mapCompanyKeyToLabel[key]}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
