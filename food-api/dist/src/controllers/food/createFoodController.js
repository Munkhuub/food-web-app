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
exports.createFoodController = void 0;
const food_model_1 = require("../../models/food.model");
const createFoodController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foods } = req.body;
    try {
        const allFood = foods.map((food) => ({
            foodName: food.foodName,
            price: food.price,
            image: food.image,
            ingredients: food.ingredients,
            category: food.category,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        yield food_model_1.foodModel.insertMany(allFood);
        return res.status(201).json({ message: "Hool shit nemegdsen" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.createFoodController = createFoodController;
//# sourceMappingURL=createFoodController.js.map