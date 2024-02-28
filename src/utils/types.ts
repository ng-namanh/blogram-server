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

export type CreatePostParam = {
  title: string;
  content: string;
  authorId: number;
  coverImageUrl: string;
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
};

export type ReturnMessage = {
  success: boolean;
  message: string;
};
