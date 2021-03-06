import express from 'express';
import { TweetController } from '../../interfaces/controllers/tweetController';
import { ExpressServerRouter } from './routers/router';

export interface Controllers {
  tweet: TweetController
}

export class Express{
  private app:express.Express = express();
  private readonly port: number;

  constructor(port:any, controllers: Controllers) {
    this.port = port;
    this.init();
    new ExpressServerRouter(this.app).init(controllers);
  }

  init(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // // クロスサイトスクリプティング対応 swagger-ui
    this.app.use((req:express.Request,res:express.Response,next:express.NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  run(){
    this.app.listen(this.port);
    console.debug('express server running...')
  }
}
