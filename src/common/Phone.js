import PropTypes from 'prop-types';

Phone.propTypes = {
  user: PropTypes.object.isRequired,
};

function Phone({ user }) {
  return (
    <a href={`tel:${user.phone}`}>{user.phone}</a>
  );
}

export default Phone;
