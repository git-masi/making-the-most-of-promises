import { fetchUser } from "../api/fake";
import type { FakeUser } from "../api/fake";
import type { UserStore, UserId } from "../types";

export async function promiseAllSettledFake(userStore: UserStore) {
  const users = await userStore.getUsers();

  console.info("starting promiseAllSettledFake");

  console.time("promiseAllSettledFake total time");

  const results = await Promise.allSettled(
    users.map(({ id }) => fetchUser(id))
  );

  const fulfilled: FakeUser[] = [];
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

  console.timeEnd("promiseAllSettledFake total time");

  console.info("finished promiseAllSettledFake");
}
