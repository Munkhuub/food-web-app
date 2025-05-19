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
exports.me = void 0;
const user_model_1 = require("../../models/user.model");
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield user_model_1.userModel.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.me = me;
//# sourceMappingURL=me.js.map