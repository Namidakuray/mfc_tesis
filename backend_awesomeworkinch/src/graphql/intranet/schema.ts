import { GraphQLSchema, GraphQLObjectType } from "graphql";
const {
    intranetUsers,
    intranetUserById,
	usersAddress,
    userAddressById
} = require("./queries");
const {
    addIntranetUser,
    updateIntranetUser,
    deleteIntranetUserById,
    addUserAddress,
    updateUserAddress,
    deleteUserAddressById,
} = require('./mutations');
const {
	countries,
    countryById,
    regions,
    RegionById,
    cities,
    cityById,
    roles,
    rolById,
    allows,
    allowById
} = require('./common/queries');
const {
    addCountry,
    updateCountry,
    deleteCountryById,
    addRegion,
    updateRegion,
    deleteRegionById,
    addCity,
    updateCity,
    deleteCityById,
    addRol,
    updateRol,
    deleteRolById,
    addAllow,
    updateAllow,
    deleteAllowById
} = require('./common/mutations');
const {
	addEeType,
    updateEeType,
    deleteEeType,
    addMainOfice,
    updateMainOfice,
    deleteMainOfice,
    addSedeAddress,
    updateSedeAddress,
    deleteSedeAddress,
    addSede,
    updateSede,
    deleteSede,
    addStudentFederation,
    updateStudentFederation,
    deleteStudentFederation,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    addCareer,
    updateCareer,
    deleteCareer,
    addStudentCenter,
    updateStudentCenter,
    deleteStudentCenter,
    addEducationEntity,
    updateEducationEntity,
    deleteEducationEntity,
    addDisabilityType,
    updateDisabilityType,
    deleteDisabilityType,
    addDisabilityDetail,
    updateDisabilityDetail,
    deleteDisabilityDetail,
    addGenderIdentity,
    updateGenderIdentity,
    deleteGenderIdentity,
    addStudentAddress,
    updateStudentAddress,
    deleteStudentAddress,
    addStudent,
    updateStudent,
    deleteStudent
} = require('./student/mutations');
const {
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
} = require('./student/queries');

const QueryType = new GraphQLObjectType({
	name: "Query",
	fields: {
		countries,
		countryById,
		regions,
		RegionById,
		cities,
		cityById,
		intranetUsers,
		intranetUserById,
		roles,
		rolById,
		allows,
		allowById,
		usersAddress,
		userAddressById,
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
		},
});
const MutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addCountry,
		updateCountry,
		deleteCountryById,
		addRegion,
		updateRegion,
		deleteRegionById,
		addCity,
		updateCity,
		deleteCityById,
		addIntranetUser,
		updateIntranetUser,
		deleteIntranetUserById,
		addRol,
		updateRol,
		deleteRolById,
		addAllow,
		updateAllow,
		deleteAllowById,
		addUserAddress,
		updateUserAddress,
		deleteUserAddressById,
		addEeType,
		updateEeType,
		deleteEeType,
		addMainOfice,
		updateMainOfice,
		deleteMainOfice,
		addSedeAddress,
		updateSedeAddress,
		deleteSedeAddress,
		addSede,
		updateSede,
		deleteSede,
		addStudentFederation,
		updateStudentFederation,
		deleteStudentFederation,
		addFaculty,
		updateFaculty,
		deleteFaculty,
		addCareer,
		updateCareer,
		deleteCareer,
		addStudentCenter,
		updateStudentCenter,
		deleteStudentCenter,
		addEducationEntity,
		updateEducationEntity,
		deleteEducationEntity,
		addDisabilityType,
		updateDisabilityType,
		deleteDisabilityType,
		addDisabilityDetail,
		updateDisabilityDetail,
		deleteDisabilityDetail,
		addGenderIdentity,
		updateGenderIdentity,
		deleteGenderIdentity,
		addStudentAddress,
		updateStudentAddress,
		deleteStudentAddress,
		addStudent,
		updateStudent,
		deleteStudent
		},
});

module.exports = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType,
});
