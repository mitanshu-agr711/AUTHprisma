import vine from '@vinejs/vine'
import { Apierror } from './Apierror.js'

vine.errorReporter=()=>new Apierror()

export const registerSchema=vine.object({
    name:vine.string().minLength(2).maxLength(150),
    email:vine.string().email(),
    password:vine.string().minLength(2).maxLength(100).confirmed(),
})