// import express from 'express';
// import swaggerJSDoc from 'swagger-jsdoc';

import {Express} from './infra/web/router'

import {ApiHandler} from './infra/api/handler/apiHandler';
import {UserRepository} from './interfaces/repository/userRepository';
import {UserService} from './usecase/service/userService';
import {UserController} from './interfaces/controllers/userController';

// // クロスサイトスクリプティング対応 swagger-ui
// app.use((req:express.Request,res:express.Response,next:express.NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// const options = {
//   swaggerDefinition:{
//     info: {
//       title: 'Hello World',
//       version: '1.0.0.'
//     },
//   },
//   apis: ['./index.js'],
// };

// const swaggerSpec = swaggerJSDoc(options);

// app.get("/api-docs.json",(req:express.Request,res:express.Response) => {
//   res.setHeader('Content-Type','application/json');
//   res.send(swaggerSpec);
// });

const apiHandler = new ApiHandler()
const userRepository = new UserRepository(apiHandler);
const userServive = new UserService(userRepository);
const controllers = {
  user: new UserController(userServive)
}

const express = new Express(3000,controllers);
express.run();

// class Person {
//   private name:string;
//   constructor(_name:string){
//     this.name = _name
//   }

//   hello (){
//     console.log("Hello",this.name);
//   }
// }

// const person = new Person("Taro");