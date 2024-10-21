const ACCESS_TOKEN_EXPIRE_TIME_MS = 1000 * 60 * 60 * 2;
const REFRESH_TOKEN_EXPIRE_TIME_MS = 1000 * 60 * 60 * 24;

const ACCESS_TOKEN_EXPIRE_TIME = "2h";
const REFRESH_TOKEN_EXPIRE_TIME = "1d";

const getAccessTokenExpiryDate = () =>
  new Date(Date.now() + ACCESS_TOKEN_EXPIRE_TIME_MS);
const getRefreshTokenExpiryDate = () =>
  new Date(Date.now() + REFRESH_TOKEN_EXPIRE_TIME_MS);

module.exports = {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
  getAccessTokenExpiryDate,
  getRefreshTokenExpiryDate,
};
