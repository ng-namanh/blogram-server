export enum Routes {
  AUTH = 'auth',
  USER = 'user',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USER = 'USER_SERVICE',
}

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
