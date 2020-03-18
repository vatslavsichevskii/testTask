import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { Routes } from "./index.router";

class App {

    public app: express.Application = express();
    public router: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost:27017/vatslav_test';

    constructor() {
      this.config();
      this.mongoSetup()
      this.router.routes(this.app, '/api');
    }

    private config(): void {
      this.app.use(cors())
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
      mongoose.Promise = global.Promise;
      mongoose.connect(this.mongoUrl, {
        useNewUrlParser: true,
      });        
    }

}

export default new App().app;
