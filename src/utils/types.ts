export type UserDetails = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  username: string;
}>;

export type ValidateUserDetails = {
  email: string;
  password: string;
};