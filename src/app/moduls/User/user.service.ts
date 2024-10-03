import { User } from "./user.model";

const getAllUserDb = async () => {
  return "somethig";
};
const getUsebyEmailDb = async (payload: string) => {
  const result = await User.findOne({ email: payload });
  return result;
};
export const userService = {
  getAllUserDb,
  getUsebyEmailDb,
};
