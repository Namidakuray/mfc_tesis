import { AuthBase } from "./authorizeClass";

type authorizeActionIntranet = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
type joinType = "INNER" | "LEFT" | "RIGHT" | "FULL";
type orderType = "ASC" | "DESC";
type queryStatement = {
	text: string;
	name?: string;
	values?: Array<any>;
};
type dbType = "intranet" | "student_support";
export type inputDataType = {
	db: dbType;
	values?: Array<string|number>;
	columns?: Array<string>;
	id?: number;
};
type inputToUpdate = {
	values?: Array<string|number>;
	columns?: Array<string>;
};


class IntranetCtl extends AuthBase {
	constructor() {
		super("intranet");
	}

	public statements(
		action: authorizeActionIntranet,
		db: dbType,
		table: Array<string>,
		id?: Number,
		inputData?: inputToUpdate,
		join?: Array<joinType>,
		orderBy?: Array<[string, orderType]>
	): queryStatement {
		table = table.map((e) => e.toLowerCase());
		if(inputData?.columns!==undefined){inputData.columns=inputData.columns.map((e)=>e.toLowerCase());}
		let queryStatement: queryStatement = { text: "" };
		if (
			action === "SELECT" &&
			id !== undefined &&
			join !== undefined &&
			table.length > 1 &&
			table.length - 1 == join.length&&
			inputData === undefined
		) {
			let joinStatement = [`SELECT * FROM ${table[0]}`];
			for (let i = 1; i <= join.length; i++) {
				if (
					(db === "student_support" &&
						this.tableAuthorize["student"].includes(
							table[i - 1]
						)) ||
					(db === "intranet" &&
						this.tableAuthorize["intranet"]?.includes(table[i - 1]))
				) {
					joinStatement.push(
						`${join[i - 1]} JOIN ${table[i]} ON ${
							table[i-1]
						}.${table[i]}_id=${table[i]}.id`
					);
				} else {
					throw new Error("Unauthorized");
				}
			}
			if (id !== undefined&&orderBy == undefined) {
				joinStatement.push(`WHERE ${table[table.length - 1]}.id=${id};`);
			}else{
				joinStatement.push(`WHERE ${table[table.length - 1]}.id=${id}`);
				if (
					orderBy !== undefined &&
					orderBy.length == 2 &&
					table.includes(orderBy[0][0].split(".")[0])
				) {
					joinStatement.push(`ORDER BY ${orderBy[0]} ${orderBy[1]};`);
				} else if(orderBy !== undefined &&!table.includes(orderBy[0][0].split(".")[0])){
					throw new Error(
						"the orderTarget table is not in the table list"
					);
				}
			}
			queryStatement = { text: joinStatement.join(" ") };
			return queryStatement;
		} else if (
			(db == "student_support" &&
				this.tableAuthorize["student"].includes(table[0])) ||
			(db == "intranet" &&
				this.tableAuthorize["intranet"]?.includes(table[0]))
		) {
			switch (action.toUpperCase()) {
				case "SELECT": {
					if(inputData?.columns!==undefined&&inputData?.values!==undefined&&inputData?.columns.length==inputData?.values.length){
						return (queryStatement = {
							text: `SELECT * FROM ${table[0]} WHERE ${table[0]}.${inputData.columns[0]}=$1;`,
							name: "get-" + table[0] + "-by-" + inputData.columns[0],
							values: [inputData.values[0]],
						});
					}else if (!id) {
						return (queryStatement = {
							text: `SELECT * FROM ${table[0]};`,
						});
					}else{
						return (queryStatement = {
							text: `SELECT * FROM ${table[0]} WHERE id=$1;`,
							name: "get-" + table[0] + "-by-id",
							values: [id],
						});
					}
				}
				case "INSERT": {
					if (
						!id &&
						inputData?.columns !== undefined &&inputData?.values !== undefined&&
						inputData.columns.length == inputData.values.length
					) {
						return (queryStatement = {
							text: `INSERT INTO ${
								table[0]
							} (${inputData.columns.map((e)=>e).join(",")}) VALUES (${inputData.values
								.map((e, i) => "$" + (i + 1))
								.join(",")}) RETURNING *;`,
							values: [...inputData.values],
						});
					} else {
						throw new Error(
							"No se puede insertar un registro sin valores"
						);
					}
				}
				case "UPDATE": {
					if (
						id &&
						inputData?.columns !== undefined && inputData?.values !== undefined&&
						inputData.columns.length == inputData.values.length
					) {
						return (queryStatement = {
							text: `UPDATE ${table[0]} SET ${inputData.columns
								.map((e, i) => e + "=$" + (i + 1))
								.join(",")} WHERE id=$${
								inputData.columns.length + 1
							} RETURNING *;`,
							values: [...inputData.values, id],
						});
					} else {
						throw new Error("No se puede actualizar la tabla");
					}
				}
				case "DELETE": {
					if (id) {
						return (queryStatement = {
							text: `DELETE FROM ${table[0]} WHERE id=$1 RETURNING *;`,
							values: [id],
						});
					} else {
						throw new Error(
							"No se puede eliminar un registro sin id"
						);
					}
				}
				default:
					throw new Error("No se puede ejecutar la acción");
			}
		} else {
			throw new Error("No se puede ejecutar la acción");
		}
	}

	public async poolQuery(
		statement: queryStatement,
		db: dbType
	): Promise<any> {
		if (db === "student_support") {
			return await this.pool[0].query(statement);
		}
		if (db === "intranet") {
			return await this.pool[1].query(statement);
		}
	}
}
export const intranetQueryCtl = new IntranetCtl();