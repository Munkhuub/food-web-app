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
exports.getOrderById = void 0;
const food_order_model_1 = require("../../models/food-order.model");
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield food_order_model_1.orderModel.findById(id);
        return res.status(200).json({ order });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getOrderById = getOrderById;
//# sourceMappingURL=get-order-by-id.js.map