// Import ValidationError from the appropriate module
// import { ValidationError } from '@vinejs/vine'; // Adjust the import path if necessary
import prisma from "../db/prisma.db.js";
import vine from "@vinejs/vine";
import { registerSchema } from "../validation/auth.validation.js";
import { Apierror } from "../validation/Apierror.js"; // Adjust the import path if necessary

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);
      console.log(payload);
      return res.status(200).json({ payload });
    } catch (error) {
      console.log("Validation error:", error);
      if (error instanceof ValidationError) {
        console.log("Validation errors:", error.messages);
        return res.status(400).json({ error: 'Validation error', messages: error.messages });
      } else {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}

export default AuthController;
