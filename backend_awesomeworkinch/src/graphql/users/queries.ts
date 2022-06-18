import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { intranetQueryCtl } from "../../db/intranetCtl";
import {studentQueryCtl, inputDataType} from '../../db/studentCtl';
import { comparePassword, generateToken } from "../../utils/tools";
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
} = require("../types");

const logginStudent = {
    type: GraphQLString,
    description: "returns the Student logged and token in the header",
    args: {
        email: {type:new GraphQLNonNull(GraphQLString)},
        password: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any,{req}:any) => {
        if(req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student"],undefined,{columns:["email"],values:[args.email]});
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                let hash= resp.rows[0].password;
                const isMatch = await comparePassword(args.password, hash);
                if(!isMatch){throw new Error("The password is incorrect")}
                let {id,career_id,rol_id,name,paternal_lname,maternal_lname,experience,created_at}=resp.rows[0];
                let token=generateToken("users",{id,career_id,rol_id,name,paternal_lname,maternal_lname,experience,created_at});
                return token;
            } catch (error) {
                return `${error}`;
            }
        }else{
            throw new Error("You are already logged in");
        }
    },
};

const logginIntranet = {
    type: GraphQLString,
    description: "returns the Intranet logged and token in the header",
    args: {
        email: {type:new GraphQLNonNull(GraphQLString)},
        password: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any,{req}:any) => {
        if(req.headers.userRole=="public"&&req.headers.authorization==undefined){
            try {
                let queryStatement = intranetQueryCtl.statements("SELECT", "intranet",["intranet_user"],undefined,{columns:["email"],values:[args.email]});
                let resp= await intranetQueryCtl.poolQuery(queryStatement, "intranet");
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                let hash= resp.rows[0].password;
                const isMatch = await comparePassword(args.password, hash);
                if(!isMatch){throw new Error("The password is incorrect")}
                let {id,name,paternal_lname,maternal_lname,rol_id}=resp.rows[0];
                let token=generateToken("intranet",{id,name,paternal_lname,maternal_lname,rol_id});
                return token;
            } catch (error) {
                return `${error}`;
            }
        }else{
            throw new Error("You are already logged in");
        }
},
};

const eeTypes = {
    type: new GraphQLList(EeType),
    description: "returns the eetypes list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["ee_type"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const eeTypesById = {
    type: EeType,
    description: "returns the eetype by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["ee_type"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    },
};
const mainOfices = {
    type: new GraphQLList(MainOfficeType),
    description: "returns the mainOfices list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["main_ofice"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const mainOficesById = {
    type: MainOfficeType,
    description: "returns the mainOfice by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["main_ofice"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
        },
};
const sedeAddresses = {
    type: new GraphQLList(SedeAddressType),
    description: "returns the sedeAddresses list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["sede_address"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const sedeAddressById = {
    type: SedeAddressType,
    description: "returns the sedeAddress by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["sede_address"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    },
};
const sedes = {
    type: new GraphQLList(SedeType),
    description: "returns the sedes list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["sede"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const sedeById = {
    type: SedeType,
    description: "returns the sede by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["sede"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    },
};
const studentFederations = {
    type: new GraphQLList(StudentFederationType),
    description: "returns the studentFederations list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student_federation"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const studentFederationById = {
    type: StudentFederationType,
    description: "returns the studentFederation by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student_federation"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    },
};
const faculties = {
    type: new GraphQLList(FacultyType),
    description: "returns the faculties list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["faculty"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const facultyById = {
    type: FacultyType,
    description: "returns the faculty by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["faculty"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    },
};
const careers = {
    type: new GraphQLList(CareerType),
    description: "returns the careers list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["career"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const careerById = {
    type: CareerType,
    description: "returns the career by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["career"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    },
};
const studentCenters = {
    type: new GraphQLList(StudentCenterType),
    description: "returns the studentCenters list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student_center"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    },
};
const studentCenterById = {
    type: StudentCenterType,
    description: "returns the studentCenter by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student_center"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    },
};
const educationEntities = {
    type: new GraphQLList(EducationEntityType),
    description: "returns the EducationEntity list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["education_entity"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    }
};
const educationEntityById = {
    type: new GraphQLList(EducationEntityType),
    description: "returns the EducationEntity by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["education_entity"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    }
};
const disabilitiesTypes = {
    type: new GraphQLList(DisabilityTypeType),
    description: "returns the DisabilityType list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["disability_type"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    }
};
const disabilityTypeById = {
    type: new GraphQLList(DisabilityTypeType),
    description: "returns the DisabilityType by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["disability_type"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    }
};
const disabilitiesDetails = {
    type: new GraphQLList(DisabilityDetailType),
    description: "returns the DisabilitiesDetail list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["disability_detail"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    }
};
const disabilityDetailById = {
    type: DisabilityDetailType,
    description: "returns the DisabilityDetail by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["disability_detail"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    }
};
const genderIdentities = {
    type: new GraphQLList(GenderIdentityType),
    description: "returns the GenderIdentity list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["gender_identity"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    }
};
const genderIdentityById = {
    type: GenderIdentityType,
    description: "returns the GenderIdentity by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["gender_identity"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    }
};
const studentsAddresses = {
    type: new GraphQLList(StudentAddressType),
    description: "returns the StudentAddress list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student_address"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    }
};
const studentAddressById = {
    type: StudentAddressType,
    description: "returns the StudentAddress by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student_address"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                return resp.rows[0];
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    }
};
const students = {
    type: new GraphQLList(StudentType),
    description: "returns the Student list",
    resolve: async(_:any,__:any,{req}:any) => {
        if(req.headers.userRole=="student"&&req.headers.authorization){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student"]);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                return resp.rows;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in to be able to access this query")};
    }
};
const studentById = {
    type: StudentType,
    description: "returns the Student by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType,{req}:any) => {
        if((req.headers.userRole=="student"&&req.headers.authorization)||req.headers.userRole=="public"){
            try {
                let queryStatement = studentQueryCtl.statements("SELECT", ["student"],args.id);
                let resp= await studentQueryCtl.poolQuery(queryStatement);
                if(resp.rows.length==0){throw new Error("The petition has not been executed")}
                const{password,...user}= resp.rows[0];
                return user;
            } catch (error) {
                return error;
            }
        }else{throw new Error("You must be logged in or public access to be able to access this query")};
    }
};
module.exports={
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
}