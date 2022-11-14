var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import bcrypt from "bcrypt";
import { STATUS_CODE } from "../enuns/StatusCodes.js";
import { newUserSchema, SignInSchema } from "../schemas/UserSchemas.js";
import * as authRepository from "../repositories/Auth.repository.js";
import jwt from "jsonwebtoken";
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, existentUser, error, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUser = req.body;
                error = newUserSchema.validate(newUser).error;
                if (error) {
                    return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send({
                            message: error.message
                        })];
                }
                newUser.email = newUser.email.toLowerCase();
                newUser.password = bcrypt.hashSync(newUser.password, 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, authRepository.getUserByEmail(newUser.email)];
            case 2:
                existentUser = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 4:
                if (existentUser.rowCount > 0) {
                    return [2 /*return*/, res.status(STATUS_CODE.CONFLICT).send("email already registered")];
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, authRepository.insertUser(newUser)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 8: return [2 /*return*/, res.sendStatus(STATUS_CODE.CREATED)];
        }
    });
}); };
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, existentUser, error, error_3, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body;
                error = SignInSchema.validate(user).error;
                if (error) {
                    return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send({
                            message: error.message
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, authRepository.getUserByEmail(user.email)];
            case 2:
                existentUser = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 4:
                if (existentUser.rowCount === 0) {
                    return [2 /*return*/, res.status(STATUS_CODE.UNAUTHORIZED).send("wrong email or password")];
                }
                return [4 /*yield*/, bcrypt.compare(user.password, existentUser.rows[0].password)];
            case 5:
                if (!(_a.sent())) {
                    return [2 /*return*/, res.status(STATUS_CODE.UNAUTHORIZED).send("wrong email or password")];
                }
                token = jwt.sign({ userId: existentUser.rows[0].id }, process.env.TOKEN_SECRET);
                return [2 /*return*/, res.status(STATUS_CODE.OK).send({ token: token })];
        }
    });
}); };
export { signUp, signIn, };
