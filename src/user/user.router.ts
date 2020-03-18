import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { UserModel } from './user.model';

export class UsersRoutes {
  // public authRoutes: AuthRoutes = new AuthRoutes();

  public routes(router, prefix): void {

    router.delete(`${prefix}/:id/`, async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const data = await UserModel.deleteOne({ _id: id });
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }
    });

    router.patch(`${prefix}/:id`, async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const data = await UserModel.updateOne({ _id: id }, {
          ...req.body,
          modifyDate: new Date(),
        });
        const user = await UserModel.findOne({ _id: id });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json(error);
      }
    });

    router.post(`${prefix}/`, async (req: Request, res: Response) => {
      try {
        const user = await UserModel.create({
          _id: Types.ObjectId(),
          registerDate: new Date(),
          modifyDate: new Date(),
          ...req.body
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json(error);
      }
    });

    router.get(`${prefix}/:timestamp/:type/`, async (req: Request, res: Response) => {
      const type = req.params.type;
      const acceptTypes = ['lte', 'gte'];
      if (!acceptTypes.includes(type)) {
        res.status(400).json({ errorCode: 2, message: `accept types =>  ${JSON.stringify(acceptTypes)}` });
      }
      let date;
      try {
        date = new Date(Number(req.params.timestamp));
      } catch (error) {
        res.status(400).json({ errorCode: 1, message: 'Bad timestamp' });
      }

      const query = {
        registerDate: {}
      };
      query.registerDate[`$${type}`] = date;

      console.log('date => ', date);
      const users = await UserModel.find(query);
      res.status(200).json(users);
    });


    router.get(`${prefix}/`, async (req: Request, res: Response) => {
      const users = await UserModel.find();
      res.status(200).json(users);
    });

    // router.post(`${prefix}/transfer`, async (req: Request, res: Response) => {
    //   const fromUser = await UserModel.findById(req.body.userId);

    //   res.status(200).json({
    //     users: {
    //       from: fromUser,
    //       to: 'toUser',
    //     },
    //   });
    // });
  }
}
