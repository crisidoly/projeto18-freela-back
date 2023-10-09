    import express from 'express';
    import { getAvailableCats, updateCatAvailability, registerCat } from '../controllers/catsController.js';
    import { signInValidation } from '../middlewares/authMiddleware.js';
    import { getModelsByUserIdDB } from '../controllers/usersController.js';
    import { ValidateToken } from '../controllers/authController.js';
    import {getCatById} from  '../controllers/catsController.js'

    const router = express.Router();

    router.get('/available-cats/:id', getCatById);
    router.get('/available-cats', getAvailableCats);
    router.get('/my-models', ValidateToken, async (req, res) => {
        const userId = res.locals.userId;
        console.log(userId)
        try {
          const myModels = await getModelsByUserIdDB(userId);
      
          res.status(200).send(myModels);
        } catch (error) {
          res.status(500).send(error.message);
        }
      });

    router.put('/cats/:id/update-availability', ValidateToken, updateCatAvailability);
    router.post('/register-cat', ValidateToken, registerCat);
    

    export default router;
