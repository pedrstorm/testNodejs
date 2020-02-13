import * as HttpStatus from "http-status";
import Helper from "../infra/helper";
import database from "../data/database";

class MoviesController {
  get(req: any, res: any) {
    database.data.find({}, async (err: any, movies: any) => {
      Helper.sendResponse(res, HttpStatus.OK, movies);
    });
  }

   getById(req: any, res: any) {
    const _id = req.params.id;
    database.data.find({ _id }, async (err: any, movies: any) => {
      Helper.sendResponse(res, HttpStatus.OK, movies);
    });
  }

  async getAllWinner(req: any, res: any) {
    database.data.find({ winner: "yes" }, async (err: any, movies: any) => {
      var allProducerName = movies.map(value =>
        value.producers.split(/,| and /)
      );

      const newArr = Array.prototype.concat(...allProducerName);
      const unic = newArr.reduce(function(a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);

      let intervalMin = [];
      let intervalMax = [];

      unic.map((name: string) => {
        const producer = movies
          .map((value: any) => {
            if (value.producers.includes(name)) {
              value.producer = name;
              return value;
            }
          })
          .filter(Boolean);

        const novo = producer.map(value => Number(value.year));
        let dataArray = Array.prototype.sort.call(novo);
        intervalMin.push({
          producer: name,
          interval: dataArray[dataArray.length - 1] - dataArray[0],
          previousWin: dataArray[0],
          followingWin: dataArray[dataArray.length - 1]
        });

        if (producer.length > 1) {
          intervalMax.push({
            producer: name,
            interval: dataArray[dataArray.length - 1] - dataArray[0],
            previousWin: dataArray[0],
            followingWin: dataArray[dataArray.length - 1]
          });
        }
      });

      const max = intervalMin.reduce(function(prev, current) {
        return prev.interval > current.interval ? prev : current;
      });

      const min = intervalMax.reduce(function(prev, current) {
        return prev.interval < current.interval ? prev : current;
      });

      const premio = {
        min: [min],
        max: [max]
      };

      Helper.sendResponse(res, HttpStatus.OK, premio);
    });
  }

  async create(req, res) {
    database.data.insert(req.body, (err, newDoc) => {
      if (err) {
        Helper.sendResponse(res, 404, "Error on insert  movie");
      } else {
        Helper.sendResponse(res, HttpStatus.OK, newDoc);
      }
    });
  }

  update(req: any, res: any) {
    const _id = req.params.id;
    database.data.update({ _id }, req.body, {}, function(err, numReplaced) {
      if (err) {
        Helper.sendResponse(res, 404, "Error on update  movie");
      } else {
        Helper.sendResponse(res, HttpStatus.OK, numReplaced);
      }
    });
  }

  delete(req: any, res: any) {
    const _id = req.params.id;
    database.data.remove({ _id }, {}, (err, movieRemoved) => {
      if (err) {
        Helper.sendResponse(res, 404, movieRemoved);
      } else {
        Helper.sendResponse(res, HttpStatus.OK, movieRemoved);
      }
    });
  }
}

export default new MoviesController();
