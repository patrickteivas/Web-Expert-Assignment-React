import React, { useState } from 'react';
import './Index.css';
import Users from '../../users/Users';
import UserModal from '../../user-modal/UserModal';

function Index() {
  const [userIdInModal, setUserIdInModal] = useState(null);

  const openModalForUserId = (userId) => {
    setUserIdInModal(userId);
  };

  const closeModal = () => {
    setUserIdInModal(null);
  };

  return (
    <div className="main-wrapper container">
      <Users openModalForUserId={openModalForUserId} />
      {Number.isInteger(userIdInModal) ? <UserModal closeModal={closeModal} openedUserId={userIdInModal} /> : null}
    </div>
  );
}

export default Index;
