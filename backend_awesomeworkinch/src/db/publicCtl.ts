import { Pool } from "pg";
const {SingletonPublic} = require('./poolConnect');

class PublicCtl {
	private pool: Pool;
	constructor() {
		this.pool = new SingletonPublic.getInstance();
	}

	public async getAllStudentsByRanking() {
		let byRankingStudents = {
			name: "get-ranking-students",
			text: "SELECT student.name, student.paternal_lname, student.maternal_lname, (SELECT name as career_name FROM career WHERE career.id=student.career_id), student.experience, student.created_at FROM student WHERE student.active=TRUE ORDER BY student.experience DESC LIMIT 100;",
		};
		try {
			let client = await this.pool.connect();
			try {
				const res = await client.query(byRankingStudents);
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

	public async getStudentsByInstitution(
		institution_id: Number
	) {
		let byInstitutionStudents = {
			name: "get-institution-students",
			text: "SELECT student.name, student.paternal_lname, student.maternal_lname, (SELECT name as career_name FROM career WHERE career.id=student.career_id), student.experience, student.created_at FROM student INNER JOIN career ON student.career_id=career.id INNER JOIN faculty ON career.faculty_id=faculty.id INNER JOIN sede ON faculty.sede_id=sede.id INNER JOIN education_entity ON sede.education_entity_id=education_entity.id WHERE education_entity.id=$1 AND student.active=TRUE ORDER BY student.experience",
			values: [institution_id],
		};
		try {
			let client = await this.pool.connect();
			try {
				const res = await client.query(byInstitutionStudents);
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
