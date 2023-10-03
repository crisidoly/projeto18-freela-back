    import express from 'express';
    import { getAvailableCats, updateCatAvailability, registerCat } from '../controllers/catsController.js';
    // import { authenticateUser } from '../middlewares/authMiddleware.js'; 

    const router = express.Router();

    router.get('/available-cats', getAvailableCats);

    router.put('/cats/:id/update-availability', updateCatAvailability);

    router.post('/register-cat', registerCat);

    export default router;
