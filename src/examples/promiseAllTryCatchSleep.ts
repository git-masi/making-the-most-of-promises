import { rejectUserEleven } from "../errors";
import { UserStore, UserId } from "../types";

export async function promiseAllTryCatchSleep(userStore: UserStore) {
  const users = await userStore.getUsers();

  console.info("starting promiseAllTryCatchSleep");

  console.time("promiseAllTryCatchSleep total time");

  const results = await Promise.all(
    users.map(async ({ id }) => {
      try {
        return await rejectUserEleven(id * 1000, id);
      } catch (error) {
        if (error instanceof Error) {
          return {
            userId: id,
            error: error.message,
          };
        }

        throw error;
      }
    })
  );

  console.log(results);

  const fulfilled: number[] = [];
  const rejected: { userId: UserId; error: string }[] = [];

  results.forEach((result) => {
    if (typeof result === "number") {
      fulfilled.push(result);
      return;
    }

    rejected.push(result);
  });

  console.info("fulfilled", fulfilled);

  console.info("rejected", rejected);

  console.timeEnd("promiseAllTryCatchSleep total time");

  console.info("finished promiseAllTryCatchSleep");
}
