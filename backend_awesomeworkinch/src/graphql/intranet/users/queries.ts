import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import {intranetQueryCtl, inputDataType} from '../../../db/intranetCtl';
const {     
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
} = require("../../types");

const eeTypes = {
    type: new GraphQLList(EeType),
    description: "returns the eetypes list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["ee_type"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const eeTypesById = {
    type: EeType,
    description: "returns the eetype by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["ee_type"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const mainOfices = {
    type: new GraphQLList(MainOfficeType),
    description: "returns the mainOfices list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["main_ofice"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const mainOficesById = {
    type: MainOfficeType,
    description: "returns the mainOfice by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["main_ofice"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const sedeAddresses = {
    type: new GraphQLList(SedeAddressType),
    description: "returns the sedeAddresses list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["sede_address"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const sedeAddressById = {
    type: SedeAddressType,
    description: "returns the sedeAddress by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["sede_address"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const sedes = {
    type: new GraphQLList(SedeType),
    description: "returns the sedes list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["sede"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const sedeById = {
    type: SedeType,
    description: "returns the sede by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["sede"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const studentFederations = {
    type: new GraphQLList(StudentFederationType),
    description: "returns the studentFederations list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student_federation"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const studentFederationById = {
    type: StudentFederationType,
    description: "returns the studentFederation by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student_federation"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const faculties = {
    type: new GraphQLList(FacultyType),
    description: "returns the faculties list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["faculty"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const facultyById = {
    type: FacultyType,
    description: "returns the faculty by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["faculty"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const careers = {
    type: new GraphQLList(CareerType),
    description: "returns the careers list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["career"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const careerById = {
    type: CareerType,
    description: "returns the career by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["career"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const studentCenters = {
    type: new GraphQLList(StudentCenterType),
    description: "returns the studentCenters list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student_center"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const studentCenterById = {
    type: StudentCenterType,
    description: "returns the studentCenter by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student_center"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const educationEntities = {
    type: new GraphQLList(EducationEntityType),
    description: "returns the EducationEntity list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["education_entity"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const educationEntityById = {
    type: new GraphQLList(EducationEntityType),
    description: "returns the EducationEntity by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["education_entity"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const disabilitiesTypes = {
    type: new GraphQLList(DisabilityTypeType),
    description: "returns the DisabilityType list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["disability_type"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const disabilityTypeById = {
    type: new GraphQLList(DisabilityTypeType),
    description: "returns the DisabilityType by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["disability_type"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const disabilitiesDetails = {
    type: new GraphQLList(DisabilityDetailType),
    description: "returns the DisabilitiesDetail list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["disability_detail"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const disabilityDetailById = {
    type: DisabilityDetailType,
    description: "returns the DisabilityDetail by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["disability_detail"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    }
};
const genderIdentities = {
    type: new GraphQLList(GenderIdentityType),
    description: "returns the GenderIdentity list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["gender_identity"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const genderIdentityById = {
    type: GenderIdentityType,
    description: "returns the GenderIdentity by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["gender_identity"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    }
};
const studentsAddresses = {
    type: new GraphQLList(StudentAddressType),
    description: "returns the StudentAddress list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student_address"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const studentAddressById = {
    type: StudentAddressType,
    description: "returns the StudentAddress by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student_address"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    }
};
const students = {
    type: new GraphQLList(StudentType),
    description: "returns the Student list",
    resolve: async() => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows;
        } catch (error) {
            return error;
        }
    }
};
const studentById = {
    type: StudentType,
    description: "returns the Student by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    }
};
module.exports={
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
}