import { sleepErr } from "./api/sleep";
import { UserId } from "./types";

export function rejectUserEleven(time: number, userId: UserId) {
  return sleepErr(time, userId, isUserEleven);
}

function isUserEleven(userId: UserId) {
  return userId === 11;
}
