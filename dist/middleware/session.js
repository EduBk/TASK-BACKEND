"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt_handle_1 = require("../utils/jwt.handle");
const checkJwt = (req, res, next) => {
    try {
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const sessionOk = (0, jwt_handle_1.verifyToken)(`${jwt}`);
        if (!sessionOk) {
            res.status(401);
            res.json({ message: 'INVALID TOKEN' });
        }
        else {
            // req.user = sessionOk;
            next();
        }
    }
    catch (e) {
        res.status(400);
        res.json({ message: 'SESSION NOT AVAILABLE' });
    }
};
exports.checkJwt = checkJwt;
