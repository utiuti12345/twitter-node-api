import express from 'express';
import {UserController} from '../../interfaces/controllers/userController';

export interface Controllers {
  user: UserController
}

export class Express{
  private app:express.Express = express()
  private port: number

  constructor(port = 3000, controllers: Controllers) {
    this.port = port
    this.init(controllers);
  }

  init(controllers: Controllers) {
    const router = express.Router();
    router.get("/hello",(req:express.Request,res:express.Response) => {
      console.log("Hello",req.query.name)
      res.send("Hello"+req.query.name);
    });
    
    router.get("/followers",async (req:express.Request,res:express.Response) => {
      const resCon = await controllers.user.getAllFollowers();
      res.send(resCon);
    });

    this.app.use(router);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  run(){
    this.app.listen(this.port)
    console.debug('express server running...')
  }
}