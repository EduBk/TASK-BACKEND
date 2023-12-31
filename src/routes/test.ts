import "dotenv/config";

import { Request, Response, Router } from "express";
import generator from "../utils/passwordGenerator.handle";

const router = Router();
const base_url = process.env.BASE_URL as string;

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
router.get("/:quantity", (req: Request, res: Response) => {
  const { quantity } = req.params;

  let passwords = [];
  const quantityNumber = parseInt(quantity);

  for (let x = 0; x < quantityNumber; x++) {
    passwords.push({ password: generator() });
  }

  res.json(passwords);
});

export { router };
