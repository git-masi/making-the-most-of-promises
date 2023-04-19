import { sleep } from "../api/sleep";
import { UserStore } from "../types";

export async function promiseAllSleep(userStore: UserStore) {
  const users = await userStore.getUsers();

  console.info("starting promiseAllSleep");

  console.time("promiseAllSleep total time");

  const results = await Promise.all(
    users.map(({ id }) => sleep(id * 1000, id))
  );

  console.log(results);

  console.timeEnd("promiseAllSleep total time");

  console.info("finished promiseAllSleep");
}
