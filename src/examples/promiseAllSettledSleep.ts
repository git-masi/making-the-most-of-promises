import { rejectUserEleven } from "../errors";
import { UserStore, UserId } from "../types";

export async function promiseAllSettledSleep(userStore: UserStore) {
  const users = await userStore.getUsers();

  console.info("starting promiseAllSettledSleep");

  console.time("promiseAllSettledSleep total time");

  const results = await Promise.allSettled(
    users.map(({ id }) => rejectUserEleven(id * 1000, id))
  );

  console.info("results", results);

  const fulfilled: UserId[] = [];
  const rejected: { userId: UserId; reason: string }[] = [];

  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      fulfilled.push(result.value);
    } else {
      const { id } = users[idx];
      rejected.push({ userId: id, reason: result.reason });
    }
  });

  console.info("fulfilled", fulfilled);

  console.info("rejected", rejected);

  console.timeEnd("promiseAllSettledSleep total time");

  console.info("finished promiseAllSettledSleep");
}
