"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
require("dotenv/config");
const express_1 = require("express");
const passwordGenerator_handle_1 = __importDefault(require("../utils/passwordGenerator.handle"));
const router = (0, express_1.Router)();
exports.router = router;
const base_url = process.env.BASE_URL;
/**
 * Get track
 * @openapi
 * /test/{quantity}:
 *    get:
 *      tags:
 *       - "Test"
 *      summary: "Retorna passwords aleatorios"
 *      description: Retorna passwords aleatoriamente segun el numero que se le envie.
 *      parameters:
 *        - quantity:
 *          in: path
 *          name: quantity
 *          schema:
 *            type: integer
 *          description: Numero de repeticiones
 *          required: true
 *      responses:
 *            '200':
 *              description: Retorna un password aleatorio "n" numero de veces.
 *              content:
 *                application/json:
 *                  schema:
 *                  type: array
 *            '422':
 *              description: Error de validacion.
 *            '404':
 *              description: No encontrado.
 */
router.get("/:quantity", (req, res) => {
    const { quantity } = req.params;
    let passwords = [];
    const quantityNumber = parseInt(quantity);
    for (let x = 0; x < quantityNumber; x++) {
        passwords.push({ password: (0, passwordGenerator_handle_1.default)() });
    }
    res.json(passwords);
});
