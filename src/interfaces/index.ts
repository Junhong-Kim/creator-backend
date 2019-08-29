export interface IUser {
  id: number;
  displayName: string;
  picture: string;
  email: string;
  googleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IYouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface IPost {
  id: number;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: boolean;
  userId: number;
  user: IUser;
  [key: string]: any;
}

export interface IPostLike {
  id: number;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  postId: number;
}
