import db from "../database/databaseConnection.js";

export async function updateCatAvailability(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

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
  const { name, photo, feature, userId } = req.body;


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