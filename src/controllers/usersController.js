import db from '../database/databaseConnection.js';


export async function getMyModels(req, res) {
    const { userId } = res.locals;
    try {
        const myModels = await getModelsByUserIdDB(userId);
        res.send(myModels.rows)
    } catch (error) {
        res.status(500).send(error.message);
    }
  }

  export async function getModelsByUserIdDB(userId) {
    try {
      const query = 'SELECT * FROM cats WHERE "userId" = $1';
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }