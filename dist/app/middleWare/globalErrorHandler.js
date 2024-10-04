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
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const config_1 = __importDefault(require("../config"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorhandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = err.statusCode ? err.statusCode : 500;
    let message = "Something went wrong";
    let errorSource = [
        {
            path: "",
            message: message,
        },
    ];
    //   zod error
    if (err instanceof zod_1.ZodError) {
        const simpliFiedzodError = (0, handleZodError_1.default)(err);
        statusCode = simpliFiedzodError.statusCode;
        message = simpliFiedzodError.message;
        errorSource = simpliFiedzodError === null || simpliFiedzodError === void 0 ? void 0 : simpliFiedzodError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simpliFiedError = (0, handleValidationError_1.default)(err);
        statusCode = simpliFiedError.statusCode;
        message = simpliFiedError.message;
        errorSource = simpliFiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
        // if (req.files && Object.keys(req.files).length > 0) {
        //   await deleteImageFromCloudinary(req.files as TImageFiles);
        // }
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    //  return
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        err,
        stack: config_1.default.NODE_ENV === "development" && (err === null || err === void 0 ? void 0 : err.stack),
    });
});
exports.default = globalErrorhandler;
