import db from '../database/databaseConnection.js';

export async function updateCatAvailability(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  try {
    await db.query('UPDATE cats SET active = $1 WHERE id = $2', [active, id]);

    res.status(200).json({ message: 'Status de disponibilidade atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o status de disponibilidade.' });
  }
}

export async function getAvailableCats(req, res) {
  try {
    const gatosDisponiveis = await db.query('SELECT * FROM cats WHERE active = true');
    res.json(gatosDisponiveis.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar gatos disponíveis.' });
  }
}

export async function registerCat(req, res) {
  const { name, photo, feature } = req.body;

  try {
    const newCat = await db.query(
      'INSERT INTO cats (name, photo, feature, active) VALUES ($1, $2, $3, true) RETURNING *',
      [name, photo, feature]
    );

    res.status(201).json(newCat.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o gato.' });
  }
}
