import { NewInMemoryUserStore } from "./stores/users";
import { loopFake } from "./examples/loopFake";
import { loopSleep } from "./examples/loopSleep";
import { promiseAllSleep } from "./examples/promiseAllSleep";
import { promiseAllSettledSleep } from "./examples/promiseAllSettledSleep";
import { promiseAllSettledFake } from "./examples/promiseAllSettledFake";
import { promiseAllTryCatchSleep } from "./examples/promiseAllTryCatchSleep";

// Run through these examples 1 by 1 to see the results

loopFake(NewInMemoryUserStore());

// loopSleep(NewInMemoryUserStore());

// promiseAllSleep(NewInMemoryUserStore());

// promiseAllTryCatchSleep(NewInMemoryUserStore());

// promiseAllSettledSleep(NewInMemoryUserStore());

// promiseAllSettledFake(NewInMemoryUserStore());
