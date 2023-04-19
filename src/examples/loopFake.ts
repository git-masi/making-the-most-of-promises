import { fetchUser } from "../api/fake";
import type { UserStore } from "../types";

export async function loopFake(userStore: UserStore) {
  const users = await userStore.getUsers();

  for (const { id } of users) {
    try {
      const externalUser = await fetchUser(id);
      console.info(externalUser);
    } catch (error) {
      console.error(error);
    }
  }
}
