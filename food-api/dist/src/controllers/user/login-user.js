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
exports.loginUser = void 0;
const user_model_1 = require("../../models/user.model");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, phoneNumber, address, role, orderedFoods, ttl, isVerified, } = req.body;
    try {
        const login = {
            email,
            password,
            phoneNumber,
            address,
            role,
            orderedFoods,
            ttl,
            isVerified,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        yield user_model_1.userModel.create(login);
        return res.status(201).json({ message: "login request sent" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=login-user.js.map