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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
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
exports.userService = {
    getAllUserDb,
    getUsebyEmailDb,
    getUsebyIdDb,
};
