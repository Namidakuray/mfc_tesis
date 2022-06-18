import { Pool } from "pg";
const { SingletonIntranet, SingletonClient } = require("./poolConnect");

type authorizeType = "student" | "intranet";
type poolAuthorizeType = {
	student: Array<string>;
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
			case "student":
				{
					this.tableAuthorize = {
						student: [
							"ee_type",
							"education_entity",
							"country",
							"region",
							"city",
							"main_office",
							"sede",
							"student_federation",
							"faculty",
							"career",
							"student_center",
							"sede_address",
							"allow",
							"rol",
							"disability_type",
							"disability_detail",
							"gender_identity",
							"student",
							"student_address",
						],
					};
					let studentPool = new SingletonClient.getInstance();
					this.pool.push(studentPool);
				}
				break;
			case "intranet": {
				this.tableAuthorize = {
					student: [
						"ee_type",
						"education_entity",
						"country",
						"region",
						"city",
						"main_office",
						"sede",
						"student_federation",
						"faculty",
						"career",
						"student_center",
						"sede_address",
						"allow",
						"rol",
						"disability_type",
						"disability_detail",
						"gender_identity",
						"student",
						"student_address",
					],
					intranet: [
						"allow",
						"rol",
						"intranet_user",
						"country",
						"region",
						"city",
						"user_address",
					],
				};
				let intranetPool = new SingletonIntranet.getInstance();
				let studentPool = new SingletonClient.getInstance();
				this.pool.push(studentPool);
				this.pool.push(intranetPool);
				break;
			}
			default:
				throw new Error("No se puede crear el objeto AuthBase");
		}
	}
	protected async getColumns(table: string, dataBase:string): Promise<Array<string>> {
		if(dataBase=="intranet"){
			let result = await this.pool[1].query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`);
			return result.rows.map(e => e.column_name);
		}else if(dataBase=="student_support"){
			let result= await this.pool[0].query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`);
			return result.rows.map(e => e.column_name);
		}else{
			return ["error"];
		}
	}
}