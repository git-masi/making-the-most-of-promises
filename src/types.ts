export type UserId = number;

export type User = { id: UserId };

export interface UserStore {
  getUsers: () => Promise<User[]>;
}
