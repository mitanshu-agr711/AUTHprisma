import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { query } from "express";

const prisma=new PrismaClient({
   log:[query,error]
})
export default prisma