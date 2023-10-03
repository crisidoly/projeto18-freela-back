import { signInSchema } from "../schemas/appSchemas.js";
import { signUpSchema } from "../schemas/appSchemas.js";
import bcrypt from "bcrypt"
import db from "../database/databaseConnection.js"



export async function signInValidation(req, res, next) {
    const signInBody = req.body;

    const { error } = signInSchema.validate(signInBody, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(`There is a body validation problem: ${errors}`)
    }

    const signInbodyValidated = await db.query("SELECT users.email, users.password, users.id FROM users WHERE email = $1", [signInBody.email])
    
    if (signInbodyValidated.rowCount === 0) {
        return res.status(401).send("email or password incorrect");
    }

    const validatePassword = bcrypt.compareSync(signInBody.password.toString(), signInbodyValidated.rows[0].password)

    if (!validatePassword) {
        return res.status(401).send("email or password incorrect");
    }


    req.user = { id: signInbodyValidated.rows[0].id };

    next();    
}

export async function signUpValidation(req, res, next) {
    const signUpBody = req.body;
    const { email } = signUpBody
    const { error } = signUpSchema.validate(signUpBody, { abortEarly: false });
    
    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(`There is a body validation problem: ${errors}`)
    }

    try {
        const emailInDB = await db.query('SELECT email FROM "users" WHERE email = $1;', [email])
        if (emailInDB.rowCount !== 0) {
            return res.status(409).send("The email is already registered");
        }

    } catch (err) {
        res.status(500).send(err.message);
        return
    }

    res.locals.signUpBody = signUpBody;
    
    next()

}

// export function authenticateUser(req, res, next) {
//     const token = req.headers.authorization;
  
//     if (!token) {
//       return res.status(401).json({ message: 'Acesso não autorizado. Token não fornecido.' });
//     }
  
//     try {
//       const decodedToken = jwt.verify(token, 'secreto'); 
  
//       req.user = decodedToken;
  
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Token inválido ou expirado.' });
//     }
//   }
  