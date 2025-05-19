"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const authorizationMiddleware = (req, res, next) => {
    const isAdmin = req.isAdmin;
    if (!isAdmin) {
        res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization-middleware.js.map