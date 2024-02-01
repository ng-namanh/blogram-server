export type UserDetails = {
  id?: number;
  name?: string;
  username?: string;
  email: string;
  password?: string;
};

export type PostDetails = {
  title: string;
  content: string;
};

export type CreatePostParams = {
  title: string;
  content: string;
  authorId: number;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  username: string;
}>;

export type ValidateUserDetails = {
  id?: number;
  email: string;
  password: string;
};

export type JwtPayload = {
  sub: number;
  email: string;
};

export type AccessToken = {
  accessToken: string;
  expireIn?: string;
};

export type ReturnMessage = {
  success: boolean;
  message: string;
};
