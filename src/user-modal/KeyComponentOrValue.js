import PropTypes from 'prop-types';
import Phone from '../common/Phone';
import Email from '../common/Email';
import Website from '../common/Website';
import Address from '../common/Address';

KeyComponentOrValue.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapKeyToComponent = {
  phone: Phone,
  website: Website,
  email: Email,
  address: Address,
};

function KeyComponentOrValue({ fieldKey, user }) {
  const Component = mapKeyToComponent[fieldKey];

  return (
    <>
      { Component ? <Component user={user} /> : user[fieldKey] }
    </>
  );
}

export default KeyComponentOrValue;
