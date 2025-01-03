import express from 'express';
const router = express.Router();
import { signin, signup, sign} from '../controllers/user.js';


router.post("/signin", signin);
router.post("/signup", signup);
router.post("/sign", sign);

export default router;
