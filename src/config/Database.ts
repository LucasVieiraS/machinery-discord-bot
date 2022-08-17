const mongoose = require('mongoose');
require('dotenv').config();
		
export class Database {

	connection : any;

	constructor() {
		this.connection = null;
	}

	connect() {
		console.log('Conectando ao banco de dados.');

		mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).then(() => {
			console.log('Banco conectado.');
			this.connection = mongoose.connection;
		}).catch(err => {
			console.error(err);
		});
	}
}

module.exports = Database;