import * as csvToJson from "csvtojson";
import * as Datastore from "nedb";
import { Movielist } from "./database.interface";

class database {
  public data = new Datastore();
  constructor() {
    this.loadCsv();
  }
  private createDB(movies: Movielist[]): void {
    this.data.insert(movies);
  }

  private loadCsv(): void {
    const csvFilePath = "./data/movielist.csv";
    csvToJson({
      delimiter: ";"
    })
      .fromFile(csvFilePath)
      .then(jsonObj => {
        this.createDB(jsonObj);
      });
  }
}

export default new database();
