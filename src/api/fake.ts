import fetch from "node-fetch";
import type { UserId } from "../types";
import { z } from "zod";

const FakeUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      // These come from this gist:
      //    https://gist.github.com/DebkanchanSamadder/1eb07af7d9595256535c5c71ea79d66e
      lat: z.string().regex(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/),
      lng: z.string().regex(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/),
    }),
  }),
  phone: z.string(),
  // Ideally `website` would match z.string().url()
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

export type FakeUser = z.infer<typeof FakeUserSchema>;

type PathParts = Array<string | number>;

const paths = Object.freeze({
  users: "users",
});

export async function fetchUser(userId: UserId) {
  const req = await fetch(constructApiUrl([paths.users, userId]));

  if (!req.ok) {
    throw new Error(`${req.status} - ${req.statusText}`);
  }

  return FakeUserSchema.parse(await req.json());
}

function constructApiUrl(pathParts: PathParts) {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  return constructUrl(baseUrl, pathParts);
}

function constructUrl(baseUrl: string, pathParts: PathParts) {
  return `${baseUrl}/${pathParts.join("/")}`;
}
