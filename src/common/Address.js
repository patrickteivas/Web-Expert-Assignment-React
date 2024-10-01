import PropTypes from 'prop-types';

Address.propTypes = {
  user: PropTypes.object.isRequired,
};

function Address({ user }) {
  const { address } = user;
  const { street, suite, city, zipcode, geo } = address;
  const { lat, lng } = geo;

  const addressLine = `${street} ${suite}, ${city}, ${zipcode}`;
  const googleMapsUrl = new URL('https://maps.google.com/');
  googleMapsUrl.searchParams.set('q', `${lat},${lng}`);

  return (
    <>
      <span>{addressLine}</span>
      {' '}
      (
      <a href={googleMapsUrl.href} target="_blank" rel="noreferrer">Google Maps</a>
      )
    </>
  );
}

export default Address;
