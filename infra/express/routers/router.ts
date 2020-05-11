import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Controllers } from '../../../infra/express/server';

export class ExpressServerRouter {
  private app:express.Express;

  constructor(_app:express.Express) {
    this.app = _app;
  }

  init(controllers: Controllers) {
    const router = express.Router();
    const swaggerSpec = swaggerJSDoc({
      swaggerDefinition:{
        info: {
          title: 'Hello World',
          version: '1.0.0.'
        },
      },
      apis: ['./router.ts'],
    });

    this.app.get("/api-docs.json",(req:express.Request,res:express.Response) => {
      res.setHeader('Content-Type','application/json');
      res.send(swaggerSpec);
    });

    router.get("/hello",(req:express.Request,res:express.Response) => {
      console.log("Hello",req.query.name);
      res.send("Hello"+req.query.name);
    });
    
    router.get("/followers",async (req:express.Request,res:express.Response) => {
      const resCon = await controllers.tweet.getAllFollowers();
      res.send(resCon);
    });

    router.get("/tweetsImage",async (req:express.Request,res:express.Response) => {
      console.log(req.query.name);
      const resCon = await controllers.tweet.getTweetsImage(req.query.name.toString());
      res.send(resCon);
    });

    router.get("/media",async (req:express.Request,res:express.Response) => {
      console.log(req.query.name);
      const resCon = await controllers.tweet.getImages(req.query.name.toString());
      res.send(resCon);
    });

    router.post("/tweet",async (req:express.Request,res:express.Response) => {
      //const body = JSON.parse(req.body);
      console.log(req.body.text);
      const text = req.body.text
      const resCon = await controllers.tweet.execTweet({text});
      res.send(resCon);
    });

    this.app.use(router);
  }
}