import { Pool } from "pg";
const {SingletonPublic} = require('./poolConnect');

class PublicCtl {
	private pool: Pool;
	constructor() {
		this.pool = new SingletonPublic.getInstance();
	}

	public async getUsersByCompany(
		institution_id: Number,
		user_atribute: Number
	) {
		let getUsersByCompany = {
			name: "get-users-by-company",
			text: "SELECT users.name, users.first_lastname, users.second_lastname, (SELECT name as company_name FROM company INNER JOIN sucursal ON company.id=sucursal.company_id WHERE sucursal.id=users.sucursal_id), (SELECT name as region_name FROM region INNER JOIN address ON region.id=address.region_id WHERE address.id=users.address_id), (SELECT name as country_name FROM country INNER JOIN address ON country.id=address.country_id WHERE address.id=users.address_id), users.created_at FROM users INNER JOIN sucursal ON users.sucursal_id=sucursal.id  WHERE sucursal.company_id=$1 AND users.status='active' ORDER BY users.$2",
			values: [institution_id, user_atribute],
		};
		try {
			let client = await this.pool.connect();
			try {
				const res = await client.query(getUsersByCompany);
				return res.rows;
			} catch (error: any) {
				return {
					message: "Error al procesar query de estudiantes por institución",
					data: error.stack,
				};
			} finally {
				client.release();
			}
		} catch (error) {
			return { message: "error al conectar con la DDBB", data: error };
		}
	}

	public async getStudentsByCareer(
		career_id: Number
	) {
		let byCareerStudents = {
			name: "get-institution-students",
			text: "SELECT student.first_name, student.paternal_lname, student.maternal_lname, (SELECT career_name FROM career WHERE career.id=student.career_id), student.experience, student.created_at, FROM student INNER JOIN career ON student.career_id=career.id WHERE career.id=$1 AND student.active=TRUE ORDER BY student.experience;",
			values: [career_id],
		};
		try {
			let client = await this.pool.connect();
					try {
						const res = await client.query(byCareerStudents);
						return res.rows;
					} catch (error: any) {
						return {
							message: "Error al procesar query de ranking",
							data: error.stack,
						};
					} finally {
						client.release();
					}
		} catch (error) {
			return { message: "error al conectar con la DDBB", data: error };
		}
	}
	public async getStudentsByRegion(
		region_id: Number
	) {
		let byRegionStudents = {
			name: "get-institution-students",
			text: "SELECT student.first_name, student.paternal_lname, student.maternal_lname, (SELECT career_name FROM career WHERE career.id=student.career_id), student.experience, student.created_at, FROM student INNER JOIN student_address ON student.id=student_address.student_id INNER JOIN city ON student_address.city_id=city.id INNER JOIN region ON city.region_id=region.id WHERE region.id=$1 AND student.active=TRUE ORDER BY student.experience;",
			values: [region_id],
		};
		try {
			let client = await this.pool.connect();
					try {
						const res = await client.query(byRegionStudents);
						return res.rows;
					} catch (error: any) {
						return {
							message: "Error al procesar query de ranking",
							data: error.stack,
						};
					} finally {
						client.release();
					}
		} catch (error) {
			return { message: "error al conectar con la DDBB", data: error };
		}
	}
};
export const publicQueryCtl = new PublicCtl();
