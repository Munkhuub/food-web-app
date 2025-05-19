"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        default: "email not added",
    },
    address: {
        type: String,
        required: false,
        default: "address not added",
    },
    image: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    orders: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "category",
        default: [],
    },
    ttl: {
        type: Date,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=user.model.js.map