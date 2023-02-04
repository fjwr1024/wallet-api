import jwt_decode from 'jwt-decode';

export const ownInfo = request => {
  const apiKey = request.cookies.access_token;
  const ownInfo = jwt_decode<{ [name: string]: string }>(apiKey);

  return ownInfo;
};
