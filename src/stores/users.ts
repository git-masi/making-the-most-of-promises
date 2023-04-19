import type { User } from "../types";

export function NewInMemoryUserStore() {
  return {
    getUsers,
  };
}

function getUsers(): Promise<User[]> {
  return new Promise((res) => res([{ id: 1 }, { id: 6 }, { id: 11 }]));
}
