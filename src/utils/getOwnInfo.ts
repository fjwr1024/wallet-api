import jwt_decode from 'jwt-decode';

export const ownInfoByJwt = request => {
  const apiKey = request.cookies.access_token;
  const ownInfo = jwt_decode<{ [name: string]: string }>(apiKey);

  return ownInfo;
};