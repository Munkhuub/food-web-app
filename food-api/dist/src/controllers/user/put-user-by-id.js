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
exports.putUserById = void 0;
const user_model_1 = require("../../models/user.model");
const putUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.userModel.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true });
        return res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.putUserById = putUserById;
//# sourceMappingURL=put-user-by-id.js.map