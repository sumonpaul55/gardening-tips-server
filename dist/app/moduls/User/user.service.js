"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
// strip related
// stripe related
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
const confiremPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId, price } = payload;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        payment_method: paymentId,
        confirm: true,
        return_url: `${config_1.default.client_site_url}/success`,
    });
    return paymentIntent;
});
const getAllUserDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
const getUsebyEmailDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: payload });
    return result;
});
const getUsebyIdDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const addFollowerAndFolloing = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const followingUser = yield user_model_1.User.findOne({ email: payload.email });
    const followedUser = yield user_model_1.User.findById(payload.userId);
    if (!followingUser || !followedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "One or more user not found");
    }
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // check the the follower already following or not
        const alreadyFollowing = yield user_model_1.User.findOne({
            _id: payload.userId,
            follower: followingUser._id,
        });
        // console.log(alreadyFollowing);
        // add to follower
        if (!alreadyFollowing) {
            yield user_model_1.User.findByIdAndUpdate(payload.userId, { follower: followingUser === null || followingUser === void 0 ? void 0 : followingUser._id }, { new: true, upsert: true, session });
            // update who is follwoing update his folloing
            yield user_model_1.User.findOneAndUpdate({ email: payload.email }, { $addToSet: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "Following successfull" };
        }
        else {
            // remove follower if already following or unfollow
            yield user_model_1.User.findByIdAndUpdate(followedUser._id, { $pull: { follower: followingUser._id } }, { new: true, upsert: true, session });
            // remove form own following
            yield user_model_1.User.findOneAndUpdate({ email: payload.email }, { $pull: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "fdsa Successfull" };
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Faild to following");
    }
});
exports.userService = {
    getAllUserDb,
    getUsebyEmailDb,
    getUsebyIdDb,
    addFollowerAndFolloing,
    confiremPayment,
};
