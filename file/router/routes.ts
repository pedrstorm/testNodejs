import * as express from "express";
import MoviesController from "../controller/moviesController";

const newsRouter = express.Router();

newsRouter.route("/api/v1/movies").get(MoviesController.get);
newsRouter.route("/api/v1/movies/:id").get(MoviesController.getById);
newsRouter.route("/api/v1/movies/winners").get(MoviesController.getAllWinner);
newsRouter.route("/api/v1/movies").post(MoviesController.create);
newsRouter.route("/api/v1/movies/:id").put(MoviesController.update);
newsRouter.route("/api/v1/movies/:id").delete(MoviesController.delete);

export default newsRouter;