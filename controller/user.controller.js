import prisma from "../db/prisma.db.js";
import vine from "@vinejs/vine";
import { registerSchema } from "../validation/auth.validation.js";

class AuthController
{
    static async register(req,res)//static use where we access the class by its name
    {
       try {
         const body=req.body();
         const validator=vine .compile(registerSchema)
         const playload=await validator.validate(body)
         console.log(playload)
         return res.status(200).json({playload})
       } catch (error) {
        console.log("validation mai error",error)
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return res.status(400,"error in validation")
            // throw error
          }

       }
    } 
}