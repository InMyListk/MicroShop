export type UserModel = {
  userId?: string;
  username: string;
  password: string;
};

export type UserModelHashed = {
  userId: string;
  username: string;
  passwordHash: string;
};
