"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const OrderItemSchema = new mongoose_1.Schema({
    food: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "food",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    foodOrderItems: {
        type: [OrderItemSchema],
        default: [],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Canceled", "Delivered"],
        default: "Pending",
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
exports.orderModel = (0, mongoose_1.model)("order", orderSchema);
//# sourceMappingURL=food-order.model.js.map