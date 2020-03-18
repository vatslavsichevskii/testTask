import {Request, Response} from "express";
import { UsersRoutes } from "./user/user.router";


export class Routes { 
  public userRoutes: UsersRoutes = new UsersRoutes();
  
  public routes(router, prefix): void {

    this.userRoutes.routes(router, `${prefix}/users`);

  }
}
