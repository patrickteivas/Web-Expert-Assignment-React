import PropTypes from 'prop-types';

Website.propTypes = {
  user: PropTypes.object.isRequired,
};

function Website({ user }) {
  return (
    <a href={`http://${user.website}`}>{user.website}</a>
  );
}

export default Website;
