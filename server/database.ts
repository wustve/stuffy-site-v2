import pg from "pg" // const Client = require('pg').Client
const {Client} = pg;
export default class DatabaseController {
     private client: pg.Client;
     constructor(dbURL: string) {
          this.client = new Client({
               connectionString: dbURL,
               ssl: {
                    rejectUnauthorized: false
               }
          });
     }

     async command(queryText: string, values?: Array<any>) {
          await this.client.connect()
          try {
               const response = await this.client.query(queryText, values)
               this.client.end()
               return response
          }
          catch (err) {
               console.log(err)
          }
          finally {
               this.client.end()
          }
     }
     async menuResult() {
          return await this.command('Select name, animal_type, image, owner FROM stuffies ORDER BY name, animal_type ASC;')
     }
}