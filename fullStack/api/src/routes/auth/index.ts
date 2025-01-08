import { Router } from "express";

import { db } from '../../db/index';
import { usersTable } from '../../db/usersSchema';
import { createUserSchema } from "../../db/usersSchema";
import { loginSchema } from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();



router.post('/register', validateData(createUserSchema), async (req, res) => {
     try {

    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();   
   
    res.status(201).json(user);

     } catch (e) {
        res.status(500).send('Internal Server Error');
     }   
     
});

router.post('/login', validateData (loginSchema), async (req, res) => {
   try {
    const {email, password} = req.cleanBody;
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!user) {
        res.status(404).send('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(401).send('Unauthorized');
    }
    
    
    //create a jwt token
    const token = jwt.sign({userId: user.id, role: user.role},
     'your-secret', {expiresIn: '12h'});

 
     res.status(200).json({token, user});       

      
    res.status(200).json({message: 'Logged in successfully '});
   }
   catch (error) {
    res.status(500).send('Internal Server Error');
    
   } 
    
});

export default router;

