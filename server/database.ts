import pg from 'pg'; // const Client = require('pg').Client
import { StuffyMenuData } from '../interfaces/StuffyMenuData';
const { Client } = pg;
export default class DatabaseController {
	private client: pg.Client;
	constructor(dbURL: string) {
		this.client = new Client({
			connectionString: dbURL,
			ssl: false
		});
	}

	async command(queryText: string, values?: Array<any>) {
		try {
			await this.client.connect();

			const response = await this.client.query(queryText, values);
			this.client.end();
			return response;
		} catch (err) {
			console.log(err);
		} finally {
			this.client.end();
		}
	}
	async menuResult(): Promise<Array<StuffyMenuData>> {
		let data = await this.command(
			'Select id, name, animal_type, image, owner FROM stuffies ORDER BY name, animal_type ASC;'
		);
		if (data) {
			return data.rows;
		} else {
			return Promise.reject('Could not get stuffy menu result from db');
		}
	}
}
