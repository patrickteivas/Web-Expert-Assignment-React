import PropTypes from 'prop-types';

Email.propTypes = {
  user: PropTypes.object.isRequired,
};

function Email({ user }) {
  return (
    <a href={`mailto:${user.email}`}>{user.email}</a>
  );
}

export default Email;
