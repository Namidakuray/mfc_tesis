import {
	GraphQLBoolean,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { intranetQueryCtl } from "../db/intranetCtl";
const protectedPool = intranetQueryCtl;

//public Types
const PublicUserType = new GraphQLObjectType({
	name: "PublicDataStudent",
	description: "Public data of students.",
	fields: () => ({
		name: { type: GraphQLString },
		paternal_lname: { type: GraphQLString },
		maternal_lname: { type: GraphQLString },
		career_name: { type: GraphQLString },
		experience: { type: GraphQLInt },
		created_at: { type: GraphQLString },
	}),
});

//Intranet Types
const IntranetUserType = new GraphQLObjectType({
	name: "IntranetUser",
	description: "Intranet User",
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: "Id of the Intranet User",
		},
		run: {
			type: GraphQLString,
			description: "Run of the Intranet User",
		},
		active: {
			type: GraphQLString,
			description: "information if the Intranet User is active",
		},
		name: {
			type: GraphQLString,
			description: "Name of the Intranet User",
		},
		paternal_lastname: {
			type: GraphQLString,
			description: "Last Name of the Intranet User",
		},
		maternal_lastname: {
			type: GraphQLString,
			description: "Last Name of the Intranet User",
		},
		born_date: {
			type: GraphQLString,
			description: "Born Date of the Intranet User",
		},
		email: {
			type: GraphQLString,
			description: "Email of the Intranet User",
		},
		password: {
			type: GraphQLString,
			description: "Password of the Intranet User",
		},
		rol: {
			type: RolType,
			description: "Rol of the Intranet User",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"intranet",
						["rol"],
						parent.role_id
					),
					"intranet"
				);
				return res.rows[0];
			},
		},
		user_address: {
			type: UserAddressType,
			description: "Address of the Intranet User",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"intranet",
						["user_address","intranet_user"],
						parent.id,
                        undefined,
                        ["INNER"]
					),
					"intranet"
				);
				return res.rows[0];
			},
		},
	}),
});
const UserAddressType = new GraphQLObjectType({
	name: "UserAddress",
	description: "User Address",
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: "Id of the User Address",
		},
		intranet_user_id: {
			type: GraphQLInt,
			description: "User Id of the User Address",
		},
		street_avenue: {
			type: GraphQLString,
			description: "Address of the User Address",
		},
		number: {
			type: GraphQLString,
			description: "Number of the User Address",
		},
		city: {
			type: CityType,
			description: "City of the User Address",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"intranet",
						["city"],
						parent.city_id
					),
					"intranet"
				);
				return res.rows[0];
			},
		},
	}),
});

//Common Types
const AllowType = new GraphQLObjectType({
	name: "Allow",
	description: "Types of allow for users|students",
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
	},
});
const RolType = new GraphQLObjectType({
	name: "Rol",
	description: "Types of rol for users|students",
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		allow: {
			type: AllowType,
			description: "Allow of the Rol",
			args: {
				db: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, { db }) {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						db,
						["allow"],
						parent.allow_id
					),
					db
				);
				return res.rows[0];
			},
		},
	},
});
const CountryType: GraphQLObjectType = new GraphQLObjectType({
	name: "Country",
	description: "list of country.",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		region: {
			type: new GraphQLList(RegionType),
			description: "Region of the country",
            args: {
				db: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent,{db}) => {
				let state = protectedPool.statements(
					"SELECT",
					db,
					["region", "country"],
					parent.id,
					undefined,
					["INNER"]
				);
				let res = await protectedPool.poolQuery(state, db);
				return res.rows;
			},
		},
	}),
});
const RegionType: GraphQLObjectType = new GraphQLObjectType({
	name: "Region",
	description: "list of region.",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		country: {
			type: CountryType,
			description: "Country of the Region",
            args: {
				db: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent,{db}) {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						db,
						["country"],
						parent.country_id
					),
					db
				);
				return res.rows[0];
			},
		},
		city: {
			type: new GraphQLList(CityType),
			description: "City of the Region",
            args: {
				db: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent,{db}) => {
				let state = protectedPool.statements(
					"SELECT",
					db,
					["city", "region"],
					parent.id,
					undefined,
					["INNER"]
				);
				let res = await protectedPool.poolQuery(state, db);
				return res.rows;
			},
		},
	}),
});
const CityType: GraphQLObjectType = new GraphQLObjectType({
	name: "City",
	description: "list of city.",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		capital: { type: GraphQLString },
		region: {
			type: RegionType,
			description: "Region of the City",
            args: {
				db: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent,{db}) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						db,
						["region"],
						parent.region_id
					),
					db
				);
				return res.rows[0];
			},
		},
	}),
});

//student Types
const EeType: GraphQLObjectType = new GraphQLObjectType({
	name: "Ee_type",
	description: "list of ee_type",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
	}),
});
const MainOfficeType: GraphQLObjectType = new GraphQLObjectType({
	name: "main_office",
	description: "list of main_office",
	fields: () => ({
		education_entity_id: { type: GraphQLInt },
		street_avenue: { type: GraphQLString },
		number: { type: GraphQLInt },
		city: {
			type: CityType,
			description: "City of the main_office",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["city"],
						parent.city_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});
const SedeAddressType: GraphQLObjectType = new GraphQLObjectType({
	name: "sede_address",
	description: "list of sede_address",
	fields: () => ({
		id: { type: GraphQLInt },
		street_avenue: { type: GraphQLString },
		number: { type: GraphQLInt },
		city: {
			type: CityType,
			description: "City of the sede_address",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["city"],
						parent.city_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});
const SedeType: GraphQLObjectType = new GraphQLObjectType({
	name: "sede",
	description: "list of sede",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		educucation_entity: {
			type: EducationEntityType,
			description: "Education Entity of the Sede",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["education_entity"],
						parent.education_entity_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		student_federation: {
			type: StudentFederationType,
			description: "Student Federation of the Sede",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["student_federation", "sede"],
						parent.id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		faculties: {
			type: new GraphQLList(FacultyType),
			description: "Faculties of the Sede",
			resolve: async (parent) => {
				let state = protectedPool.statements(
					"SELECT",
					"student_support",
					["faculty", "sede"],
					parent.id,
					undefined,
					["INNER"]
				);
				let res = await protectedPool.poolQuery(
					state,
					"student_support"
				);
				return res.rows;
			},
		},
		sede_address: {
			type: SedeAddressType,
			description: "sede_address of the Sede",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["sede_address"],
						parent.id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});
const StudentFederationType: GraphQLObjectType = new GraphQLObjectType({
	name: "student_federation",
	description: "list of student_federation",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		active: { type: GraphQLBoolean },
		sede: {
			type: SedeType,
			description: "sede of the student_federation",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["sede"],
						parent.sede_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});
const FacultyType: GraphQLObjectType = new GraphQLObjectType({
	name: "faculty",
	description: "list of faculty",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		sede: {
			type: SedeType,
			description: "sede of the faculty",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["sede"],
						parent.sede_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		careers: {
			type: new GraphQLList(CareerType),
			description: "Careers of the Faculty",
			resolve: async (parent) => {
				let state = protectedPool.statements(
					"SELECT",
					"student_support",
					["career", "faculty"],
					parent.id,
					undefined,
					["INNER"]
				);
				let res = await protectedPool.poolQuery(
					state,
					"student_support"
				);
				return res.rows;
			},
		},
	}),
});
const CareerType: GraphQLObjectType = new GraphQLObjectType({
	name: "career",
	description: "list of career",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		faculty: {
			type: FacultyType,
			description: "faculty of the career",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["faculty"],
						parent.faculty_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		student_centers: {
			type: new GraphQLList(StudentCenterType),
			description: "Student Centers of the Career",
			resolve: async (parent) => {
				let state = protectedPool.statements(
					"SELECT",
					"student_support",
					["student_center", "career"],
					parent.id,
					undefined,
					["INNER"]
				);
				let res = await protectedPool.poolQuery(
					state,
					"student_support"
				);
				return res.rows;
			},
		},
	}),
});
const StudentCenterType: GraphQLObjectType = new GraphQLObjectType({
	name: "student_center",
	description: "list of student_center",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		active: { type: GraphQLBoolean },
		career: {
			type: CareerType,
			description: "career of the student_center",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["career"],
						parent.career_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});
const EducationEntityType: GraphQLObjectType = new GraphQLObjectType({
	name: "education_entity",
	description: "list of education_entity",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		rut: { type: GraphQLString },
		ee_type: {
			type: EeType,
			description: "Ee_type of the education_entity",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["ee_type"],
						parent.ee_type_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		main_office: {
			type: MainOfficeType,
			description: "main_office of the education_entity",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["main_office"],
						parent.id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		sede: {
			type: new GraphQLList(SedeType),
			description: "sedes of the education_entity",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["sede"],
						parent.id
					),
					"student_support"
				);
				return res.rows;
			},
		},
		student_federation: {
			type: new GraphQLList(StudentFederationType),
			description: "student_federations of the education_entity",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["student_federation", "sede", "education_entity"],
						parent.id
					),
					"student_support"
				);
				return res.rows;
			},
		},
	}),
});
const DisabilityTypeType: GraphQLObjectType = new GraphQLObjectType({
	name: "disability_type",
	description: "list of disability type",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		types: {
			type: new GraphQLList(DisabilityDetailType),
			description: "list of disability details of the disability type",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["disability_detail", "disability_type"],
						parent.id
					),
					"student_support"
				);
				return res.rows;
			},
		},
	}),
});
const DisabilityDetailType: GraphQLObjectType = new GraphQLObjectType({
	name: "disability_detail",
	description: "list of disability detail",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		disability_type: {
			type: DisabilityTypeType,
			description: "disability_type of the disability_detail",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["disability_type"],
						parent.disability_type_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});
const GenderIdentityType: GraphQLObjectType = new GraphQLObjectType({
	name: "gender_identity",
	description: "types of gender identity",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
	}),
});
const StudentAddressType = new GraphQLObjectType({
	name: "StudentAddress",
	description: "Student Address",
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: "Id of the Student Address",
		},
		student_id: {
			type: GraphQLInt,
			description: "Student Id of the Student Address",
		},
		street_avenue: {
			type: GraphQLString,
			description: "Address of the Student Address",
		},
		number: {
			type: GraphQLString,
			description: "Number of the Student Address",
		},
		city: {
			type: CityType,
			description: "City of the Student Address",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["city"],
						parent.city_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});
const StudentType: GraphQLObjectType = new GraphQLObjectType({
	name: "student",
	description: "list of student",
	fields: () => ({
		id: { type: GraphQLInt },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		active: { type: GraphQLBoolean },
		run: { type: GraphQLString },
		name: { type: GraphQLString },
		paternal_lname: { type: GraphQLString },
		maternal_lname: { type: GraphQLString },
		birth_date: { type: GraphQLString },
		experience: { type: GraphQLInt },
		created_at: { type: GraphQLString },
		career: {
			type: CareerType,
			description: "career of the student",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["career"],
						parent.career_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		rol: {
			type: RolType,
			description: "rol of the student",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["rol"],
						parent.rol_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		disability_detail: {
			type: DisabilityDetailType,
			description: "disability_detail of the student",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["disability_detail"],
						parent.disability_detail_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		gender_identity: {
			type: GenderIdentityType,
			description: "gender identity of the student",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["gender_identity"],
						parent.gender_identity_id
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
		student_address: {
			type: StudentAddressType,
			description: "Address of the Student",
			resolve: async (parent) => {
				let res = await protectedPool.poolQuery(
					protectedPool.statements(
						"SELECT",
						"student_support",
						["student_address","student"],
						parent.id,
                        undefined,
                        ["INNER"]
					),
					"student_support"
				);
				return res.rows[0];
			},
		},
	}),
});

module.exports = {
	PublicUserType,
	IntranetUserType,
	CountryType,
	RegionType,
	CityType,
	RolType,
	AllowType,
	UserAddressType,
    //DB:StudentSupport
    EeType,
    MainOfficeType,
    SedeAddressType,
    SedeType,
    StudentFederationType,
    FacultyType,
    CareerType,
    StudentCenterType,
    EducationEntityType,
    DisabilityTypeType,
    DisabilityDetailType,
    GenderIdentityType,
    StudentAddressType,
    StudentType,
};
