    import express from 'express';
    import { getAvailableCats, updateCatAvailability, registerCat } from '../controllers/catsController.js';
    import { signInValidation } from '../middlewares/authMiddleware.js';
    import { getModelsByUserIdDB } from '../controllers/usersController.js';


    const router = express.Router();

    router.get('/available-cats', getAvailableCats);
    router.get('/my-models', signInValidation, async (req, res) => {
        const userId = req.user.id;
      
        try {
          const myModels = await getModelsByUserIdDB(userId);
      
          res.json(myModels);
        } catch (error) {
          res.status(500).send(error.message);
        }
      });

    router.put('/cats/:id/update-availability', signInValidation, updateCatAvailability);
    router.post('/register-cat', registerCat);

    export default router;
