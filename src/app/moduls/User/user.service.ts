import { User } from "./user.model";

const getAllUserDb = async () => {
  return await User.find();
};
const getUsebyEmailDb = async (payload: string) => {
  const result = await User.findOne({ email: payload });
  return result;
};
const getUsebyIdDb = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
export const userService = {
  getAllUserDb,
  getUsebyEmailDb,
  getUsebyIdDb,
};
