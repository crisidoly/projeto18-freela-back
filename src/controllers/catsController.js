import db from "../database/databaseConnection.js";

export async function updateCatAvailability(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;
  console.log(userId)
  try {
  
    const catBelongsToUser = await db.query('SELECT "userId", "active" FROM cats WHERE id = $1', [id]);

    if (catBelongsToUser.rowCount === 0 || catBelongsToUser.rows[0].userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para atualizar a disponibilidade deste gato.' });
    }

    const currentAvailability = catBelongsToUser.rows[0].active;
   
    const newAvailability = !currentAvailability;

    await db.query('UPDATE cats SET active = $1 WHERE id = $2', [newAvailability, id]);

    res.status(200).json({ message: 'Status de disponibilidade atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o status de disponibilidade.' });
  }
}


export async function getAvailableCats(req, res) {
  try {
    const gatosDisponiveis 
    
    = await db.query('SELECT * FROM cats WHERE active = true');
    res.json(gatosDisponiveis.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar gatos disponíveis.' });
  }
}

export async function registerCat(req, res) {
  const { name, photo, feature } = req.body;
  const userId = res.locals.userId

  try {
    const newCat = await db.query(
      'INSERT INTO cats (name, photo, feature, active, "userId") VALUES ($1, $2, $3, true, $4) RETURNING *',
      [name, photo, feature, userId]
    );

    res.status(201).json(newCat.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o gato.' });
  }
}

export async function getCatById(req, res) {
  const { id } = req.params;
  try {
    const query = `
      SELECT cats.id, cats.name as cat_name, cats.photo, cats.feature, cats.active,
             users.id as userId, users.name as ownerName, users.email as ownerEmail,
             users.cpf as ownerCpf, users.phone as ownerPhone
      FROM cats
      INNER JOIN users ON cats."userId" = users.id
      WHERE cats.id = $1
    `;
    console.log(id)
    const cat = await db.query(query, [id]);
    
    if (cat.rowCount === 0) {
      return res.status(404).json({ error: 'Gato não encontrado.' });
    }

    res.status(200).json(cat.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o gato.' });
  }
}
