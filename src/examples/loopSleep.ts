import { sleep } from "../api/sleep";
import { User } from "../types";

interface UserStore {
  getUsers: () => Promise<User[]>;
}

export async function loopSleep(userStore: UserStore) {
  const users = await userStore.getUsers();

  console.info("starting loopSleep");

  console.time("loopSleep total time");

  for (const { id } of users) {
    try {
      const externalUser = await sleep(id * 1000, id);
      console.info(externalUser);
    } catch (error) {
      console.error(error);
    }
  }

  console.timeEnd("loopSleep total time");

  console.info("finished loopSleep");
}
