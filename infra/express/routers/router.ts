import express, {NextFunction} from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Controllers } from '../../../infra/express/server';
import encode from "../../../lib/encoding";
import e from "express";

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

    router.get("/api-docs.json",(req:express.Request,res:express.Response) => {
      res.setHeader('Content-Type','application/json');
      res.send(swaggerSpec);
    });

    router.get("/hello",(req:express.Request,res:express.Response) => {
      console.log("Hello",req.query.name);
      res.send("Hello"+req.query.name);
    });

    // router.get("/followers",async (req:express.Request,res:express.Response) => {
    //   const resCon = await controllers.tweet.getAllFollowers();
    //   res.send(resCon);
    // });
    //
    // router.get("/tweetsImage",async (req:express.Request,res:express.Response) => {
    //   console.log(req.query.name);
    //   const resCon = await controllers.tweet.getTweetsImage(req.query.name.toString());
    //   res.send(resCon);
    // });
    //
    // router.get("/media",async (req:express.Request,res:express.Response) => {
    //   console.log(req.query.name);
    //   const resCon = await controllers.tweet.getImages(req.query.name.toString());
    //   res.send(resCon);
    // });

    router.post("/retweet",async (req:express.Request,res:express.Response,next:NextFunction) => {
      try {
        console.log(req.body.id);
        const id = req.body.id;
        const resCon = await controllers.tweet.postReTweet({id});
        res.send(resCon);
      }catch (e) {
        next(e);
      }

    });

    router.post("/tweet",async (req:express.Request,res:express.Response,next:NextFunction) => {
      try {
        console.log(req.body.text);
        const text = req.body.text;
        const response = await controllers.tweet.postTweet({text});
        res.send(response);
      }catch (e) {
        next(e);
      }
    });

    router.get("/search",async (req:express.Request,res:express.Response,next:NextFunction) => {
      try {
        console.log(req.query.q.toString());
        const params = {
          query:req.query.q.toString()
        };
        const response = await controllers.tweet.searchTweet(params);
        res.send(response);
      }catch (e) {
        next(e);
      }
    });

    router.get('/friends',async (req:express.Request,res:express.Response,next:NextFunction) => {
      try {
        const response = await controllers.tweet.getFriends();
        res.send(response);
      }catch (e) {
        next(e);
      }
    });

    router.post('/prize',async (req:express.Request,res:express.Response,next:NextFunction) => {
      try {
        console.log(req.body.query);
        const query = req.body.query;
        const response = await controllers.tweet.participatePrizeCompetition({query});
        res.send(response);
      }catch (e) {
        next(e);
      }
    });

    router.use((error:Error, req:express.Request, res:express.Response, next:NextFunction) => {
      console.error(error.stack);
      if(Array.isArray(error)){
        res.status(500).send(error[0].message);
      }
      res.status(500).send(error.message);
    });

    this.app.use(router);
  }
}
