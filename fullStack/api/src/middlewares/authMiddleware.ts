import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  
    const token = req.header('Authorization');
    if (!token) { res.status(401).send('Access Denied')
             return;}
    try {
        
        const decoded = jwt.verify(token, 'your-secret');
        if (typeof decoded !== 'object' || !decoded?.userId) {
            res.status(400).send('Invalid Token');
            return;
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        
        console.log(decoded);
      
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }


}

export function verifySeller(req: Request, res: Response, next: NextFunction){
     const role = req.role;
    if (role !== 'seller') {
      res.status(403).json({ message: 'You are not a seller' });
      return;
    }
    next();
  }

