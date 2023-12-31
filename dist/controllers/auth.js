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
exports.loginCtrl = exports.registerCtrl = void 0;
require("dotenv/config");
const auth_service_1 = require("../services/auth.service");
const error_handle_1 = require("../utils/error.handle");
const registerCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responserUser = yield (0, auth_service_1.registerNewUser)(req);
        res.json(responserUser);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "Error en la creación", e);
    }
});
exports.registerCtrl = registerCtrl;
const loginCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, auth_service_1.loginUser)(req, res);
        res.json(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "Credenciales invalidas", e);
    }
});
exports.loginCtrl = loginCtrl;
