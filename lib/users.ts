"use server";
import { IUser } from "@/types";
import { promises as fs } from "fs";

const userFile = "/data/user.json";

export const getUsers = async () => {
  const data = await fs.readFile(userFile, "utf-8");
  return JSON.parse(data);
};

export const saveUser = async (user: IUser) => {
  const users = await getUsers();
  users.push(user);
  await fs.writeFile(userFile, JSON.stringify(users, null, 2));
};

export const findUser = async (email: string) => {
  const users = await getUsers();
  return users.filter((user: IUser) => user.email === email);
};
