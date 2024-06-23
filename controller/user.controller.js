// Import ValidationError from the appropriate module
// import { ValidationError } from '@vinejs/vine'; // Adjust the import path if necessary
import prisma from "../db/prisma.db.js";
import vine from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import bcrypt from "bcrypt"
import { Apierror } from "../validation/Apierror.js"; // Adjust the import path if necessary
import { messages } from "@vinejs/vine/defaults";
import { platform } from "os";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);
       
      //check user is already register or not
      const existingUser = await prisma.user.findUnique({
        where: { email: payload.email }
      });

     if (existingUser) {
        return res.status(400).json({
          error: {
            email: "Email is already registered"
          }
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);
      payload.password = hashedPassword;


      console.log(payload);
 
      const user=await prisma.user.create({
        data:payload
      })

      return res.status(200).json({ 
        messages:"user register successfully",
        user
       });

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

  static async login(req,res)
  {
    try {
       const body=req.body;
       const validator=vine.compile(loginSchema);
       const payload=await validator.validate(body)
        
       const findUser=await prisma.user.findUnique({
        where: { email: payload.email }
        
    })
    if(findUser)
      {
        if(bcrypt.compareSync(payload.password,findUser.password))
        {
          return res.status(200).json({messages:"user login successfully"})
         
        }
      }
      return res.status(400).json({error: 'no user exist with these details'});
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
