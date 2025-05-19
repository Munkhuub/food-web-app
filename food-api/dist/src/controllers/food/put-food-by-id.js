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
exports.putFoodById = void 0;
const food_model_1 = require("../../models/food.model");
const putFoodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodName, price, image, ingredients, category } = req.body;
    const { id } = req.params;
    try {
        const updatedFood = yield food_model_1.foodModel.findByIdAndUpdate(id, { foodName, price, image, ingredients, category }, { new: true } // `new: true` ensures you get the updated document
        );
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        return res.status(200).json({ food: updatedFood });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error });
    }
});
exports.putFoodById = putFoodById;
//# sourceMappingURL=put-food-by-id.js.map