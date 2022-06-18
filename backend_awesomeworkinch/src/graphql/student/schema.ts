import { GraphQLSchema, GraphQLObjectType } from "graphql";
const {
    logginStudent,
    logginIntranet,
    eeTypes,
    eeTypesById,
    mainOfices,
    mainOficesById,
    sedeAddresses,
    sedeAddressById,
    sedes,
    sedeById,
    studentFederations,
    studentFederationById,
    faculties,
    facultyById,
    careers,
    careerById,
    studentCenters,
    studentCenterById,
    educationEntities,
    educationEntityById,
    disabilitiesTypes,
    disabilityTypeById,
    disabilitiesDetails,
    disabilityDetailById,
    genderIdentities,
    genderIdentityById,
    studentsAddresses,
    studentAddressById,
    students,
    studentById
} = require("./queries");
const {
    updateStudentFederation,
    updateStudentCenter,
    addStudentAddress,
    updateStudentAddress,
    addStudent,
    updateStudent,
	changeRole,
} = require('./mutations');

const QueryType = new GraphQLObjectType({
	name: "Query",
	fields: {
		logginStudent,
		logginIntranet,
		eeTypes,
		eeTypesById,
		mainOfices,
		mainOficesById,
		sedeAddresses,
		sedeAddressById,
		sedes,
		sedeById,
		studentFederations,
		studentFederationById,
		faculties,
		facultyById,
		careers,
		careerById,
		studentCenters,
		studentCenterById,
		educationEntities,
		educationEntityById,
		disabilitiesTypes,
		disabilityTypeById,
		disabilitiesDetails,
		disabilityDetailById,
		genderIdentities,
		genderIdentityById,
		studentsAddresses,
		studentAddressById,
		students,
		studentById,
	},
});
const MutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		updateStudentFederation,
		updateStudentCenter,
		addStudentAddress,
		updateStudentAddress,
		addStudent,
		updateStudent,
		changeRole,
	},
});

module.exports = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType,
});
