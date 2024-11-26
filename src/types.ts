export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface TwoWayResponse {
  status: number;
  message: string;
}
