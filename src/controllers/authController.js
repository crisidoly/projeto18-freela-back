import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/databaseConnection.js';

export async function SignIn(req, res) {
  const { email, password } = req.body;
  const token = uuidv4();

  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (!user.rowCount) {
      return res.status(401).send('Usuário não existe.');
    }

    const hashedPassword = user.rows[0].password;

    if (!bcrypt.compareSync(password, hashedPassword)) {
      return res.status(401).send('Senha ou email incorretos.');
    }

    await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [user.rows[0].id, token]);

    res.status(200).send({ token, userId: user.rows[0].id });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function SignUp(req, res) {
    const { name, email, password, confirmPassword, phone, cpf } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).send({ message: 'As senhas devem ser iguais!' });
    }

    try {
        const existingUser = await db.query('SELECT email FROM users WHERE email = $1', [email]);

        if (existingUser.rowCount > 0) {
            return res.status(409).send('E-mail já cadastrado.');
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const newUser = await db.query('INSERT INTO users (name, email, password, phone, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, passwordHash, phone, cpf]);
        console.log(newUser)
        res.status(201).send(newUser.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}