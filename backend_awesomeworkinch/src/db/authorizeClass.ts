import { Pool } from "pg";
const { SingletonIntranet, SingletonClient } = require("./poolConnect");

type authorizeType = "users" | "intranet";
type poolAuthorizeType = {
	users: Array<string>;
	intranet?: Array<string>;
};

export class AuthBase {
	private authorizeType: string;
	protected pool: Array<Pool>;
	protected tableAuthorize: poolAuthorizeType;

	constructor(authorizeType: authorizeType) {
		this.authorizeType = authorizeType;
		this.pool = [];
		switch (this.authorizeType) {
			case "users":
				{
					this.tableAuthorize = {
						users: [
							"allow",
							"rol",
							"allow_rol",
							"country",
							"region",
							"city",
							"address",
							"company",
							"sucursal",
							"users",
							"rol_user"
						],
					};
					let usersPool = new SingletonClient.getInstance();
					this.pool.push(usersPool);
				}
				break;
			case "intranet": {
				this.tableAuthorize = {
					users: [
						"allow",
						"rol",
						"allow_rol",
						"country",
						"region",
						"city",
						"address",
						"company",
						"sucursal",
						"users",
						"rol_user"
					],
					intranet: [
						"allow",
						"rol",
						"allow_rol",
						"country",
						"region",
						"city",
						"address",
						"company",
						"sucursal",
						"users",
						"rol_user"
					],
				};
				let intranetPool = new SingletonIntranet.getInstance();
				let usersPool = new SingletonClient.getInstance();
				this.pool.push(usersPool);
				this.pool.push(intranetPool);
				break;
			}
			default:
				throw new Error("No se puede crear el objeto AuthBase");
		}
	}
	protected async getColumns(table: string, dataBase:string): Promise<Array<string>> {
		if(dataBase=="users_db"){
			let result = await this.pool[1].query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`);
			return result.rows.map(e => e.column_name);
		}else{
			return ["error"];
		}
	}
}