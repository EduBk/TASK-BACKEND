"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const SESSION_SECRET = process.env.SESSION_SECRET;
const generateToken = (payload) => {
    const data = JSON.parse(payload);
    const jwt = (0, jsonwebtoken_1.sign)(data, SESSION_SECRET, {
        expiresIn: '24h'
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isok = (0, jsonwebtoken_1.verify)(jwt, SESSION_SECRET);
    return isok;
};
exports.verifyToken = verifyToken;
