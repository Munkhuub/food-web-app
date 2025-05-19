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
exports.createCategoryController = void 0;
const food_category_model_1 = require("../../models/food-category.model");
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categories } = req.body;
    try {
        const allCategories = categories.map((category) => ({
            categoryName: category.categoryName,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        yield food_category_model_1.categoryModel.insertMany(allCategories);
        return res.status(201).json({ message: "Category nemegdsen" });
    }
    catch (error) {
        console.error("Error details:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message || "Unknown error",
        });
    }
});
exports.createCategoryController = createCategoryController;
//# sourceMappingURL=createCategoryController.js.map