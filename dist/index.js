"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! Importa variables de ENTORNO
require("dotenv/config");
//! Importa la APP definida en app.ts
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000;
//! Se inicia el servidor y queda en escucha
app_1.default.listen(PORT, () => console.log(`App corriendo en puerto: ${PORT}`));
