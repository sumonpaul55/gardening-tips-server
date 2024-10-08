/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { User } from "./user.model";
import { startSession } from "mongoose";
import AppError from "../../errors/AppError";

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

const addFollowerAndFolloing = async (payload: { email: string; userId: string }) => {
  const followingUser = await User.findOne({ email: payload.email });
  const followedUser = await User.findById(payload.userId);
  if (!followingUser || !followedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "One or more user not found");
  }

  const session = await startSession();
  try {
    session.startTransaction();
    // check the the follower already following or not
    const alreadyFollowing = await User.findOne({
      _id: payload.userId,
      follower: followingUser._id,
    });
    // console.log(alreadyFollowing);
    // add to follower
    if (!alreadyFollowing) {
      await User.findByIdAndUpdate(payload.userId, { follower: followingUser?._id }, { new: true, upsert: true, session });
      // update who is follwoing update his folloing
      await User.findOneAndUpdate({ email: payload.email }, { $addToSet: { following: payload.userId } }, { new: true, upsert: true, session });
      await session.commitTransaction();
      await session.endSession();
      return { message: "Following successfull" };
    } else {
      // remove follower if already following or unfollow
      await User.findByIdAndUpdate(followedUser._id, { $pull: { follower: followingUser._id } }, { new: true, upsert: true, session });
      // remove form own following
      await User.findOneAndUpdate({ email: payload.email }, { $pull: { following: payload.userId } }, { new: true, upsert: true, session });
      await session.commitTransaction();
      await session.endSession();
      return { message: "fdsa Successfull" };
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Faild to following");
  }
};

export const userService = {
  getAllUserDb,
  getUsebyEmailDb,
  getUsebyIdDb,
  addFollowerAndFolloing,
};
