import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import {intranetQueryCtl, inputDataType} from '../../../db/intranetCtl';
import {comparePassword,encPassword} from '../../../services/utils/tools';
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

const addEeType = {
    type: EeType,
    description: "returns the EeType added",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["ee_type"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateEeType = {
    type: EeType,
    description: "returns the EeType updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["ee_type"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteEeType = {
    type: EeType,
    description: "returns the EeType deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["ee_type"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addMainOfice = {
    type: MainOfficeType,
    description: "returns the MainOfice added",
    args: {
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLInt)}
    },
    resolve: async(_:null,args:inputDataType) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["main_office"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateMainOfice = {
    type: MainOfficeType,
    description: "returns the MainOfice updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLInt)}
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["main_office"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteMainOfice = {
    type: MainOfficeType,
    description: "returns the MainOfice deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["main_office"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addSedeAddress = {
    type: SedeAddressType,
    description: "returns the SedeAddress added",
    args: {
        sede_id:{type:new GraphQLNonNull(GraphQLInt)},
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["sede_address"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateSedeAddress = {
    type: SedeAddressType,
    description: "returns the SedeAddress updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        sede_id:{type:new GraphQLNonNull(GraphQLInt)},
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["sede_address"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteSedeAddress = {
    type: SedeAddressType,
    description: "returns the SedeAddress deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["sede_address"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addSede = {
    type: SedeType,
    description: "returns the Sede added",
    args: {
        name:{type:new GraphQLNonNull(GraphQLString)},
        education_entity_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["sede"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateSede = {
    type: SedeType,
    description: "returns the Sede updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        education_entity_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["sede"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteSede = {
    type: SedeType,
    description: "returns the Sede deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["sede"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addStudentFederation = {
    type: StudentFederationType,
    description: "returns the StudentFederation added",
    args: {
        name:{type:new GraphQLNonNull(GraphQLString)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        sede_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["student_federation"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateStudentFederation = {
    type: StudentFederationType,
    description: "returns the StudentFederation updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        sede_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["student_federation"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteStudentFederation = {
    type: StudentFederationType,
    description: "returns the StudentFederation deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["student_federation"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addFaculty = {
    type: FacultyType,
    description: "returns the Faculty added",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)},
        sede_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["faculty"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateFaculty = {
    type: FacultyType,
    description: "returns the Faculty updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        sede_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["faculty"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteFaculty = {
    type: FacultyType,
    description: "returns the Faculty deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["faculty"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addCareer = {
    type: CareerType,
    description: "returns the Career added",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)},
        faculty_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["career"],undefined,args);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateCareer = {
    type: CareerType,
    description: "returns the Career updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        faculty_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["career"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteCareer = {
    type: CareerType,
    description: "returns the Career deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["career"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addStudentCenter = {
    type: StudentCenterType,
    description: "returns the StudentCenter added",
    args: {
        name:{type:new GraphQLNonNull(GraphQLString)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        career_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["student_center"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateStudentCenter = {
    type: StudentCenterType,
    description: "returns the StudentCenter updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        career_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["student_center"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteStudentCenter = {
    type: StudentCenterType,
    description: "returns the StudentCenter deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["student_center"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addEducationEntity = {
    type: EducationEntityType,
    description: "returns the EducationEntity added",
    args: {
        rut:{type:new GraphQLNonNull(GraphQLString)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        ee_type_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["education_entity"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateEducationEntity = {
    type: EducationEntityType,
    description: "returns the EducationEntity updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        rut:{type:new GraphQLNonNull(GraphQLString)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        ee_type_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["education_entity"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteEducationEntity = {
    type: EducationEntityType,
    description: "returns the EducationEntity deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["education_entity"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addDisabilityType = {
    type: DisabilityTypeType,
    description: "returns the DisabilityType added",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["disability_type"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateDisabilityType = {
    type: DisabilityTypeType,
    description: "returns the DisabilityType updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["disability_type"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteDisabilityType = {
    type: DisabilityTypeType,
    description: "returns the DisabilityType deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["disability_type"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addDisabilityDetail = {
    type: DisabilityDetailType,
    description: "returns the DisabilityDetail added",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)},
        disability_type_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["disability_detail"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateDisabilityDetail = {
    type: DisabilityDetailType,
    description: "returns the DisabilityDetail updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        disability_type_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["disability_detail"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteDisabilityDetail = {
    type: DisabilityDetailType,
    description: "returns the DisabilityDetail deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["disability_detail"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addGenderIdentity = {
    type: GenderIdentityType,
    description: "returns the GenderIdentity added",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["gender_identity"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateGenderIdentity = {
    type: GenderIdentityType,
    description: "returns the GenderIdentity updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["gender_identity"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteGenderIdentity = {
    type: GenderIdentityType,
    description: "returns the GenderIdentity deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["gender_identity"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addStudentAddress = {
    type: StudentAddressType,
    description: "returns the StudentAddress added",
    args: {
        student_id:{type:new GraphQLNonNull(GraphQLInt)},
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["student_address"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateStudentAddress = {
    type: StudentAddressType,
    description: "returns the StudentAddress updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        student_id:{type:new GraphQLNonNull(GraphQLInt)},
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["student_address"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteStudentAddress = {
    type: StudentAddressType,
    description: "returns the StudentAddress deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["student_address"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const addStudent = {
    type: StudentType,
    description: "returns the Student added",
    args: {
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
        career_id:{type:new GraphQLNonNull(GraphQLInt)},
        rol_id:{type:new GraphQLNonNull(GraphQLInt)},
        disability_detail_id:{type:new GraphQLNonNull(GraphQLInt)},
        gender_identity_id:{type:new GraphQLNonNull(GraphQLInt)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        run:{type:new GraphQLNonNull(GraphQLString)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        paternal_lname:{type:new GraphQLNonNull(GraphQLString)},
        maternal_lname:{type:new GraphQLNonNull(GraphQLString)},
        birth_date:{type:new GraphQLNonNull(GraphQLString)},
        experience:{type:GraphQLInt},
    },
    resolve: async(_:null,args:any) => {
        args.password=await encPassword(args.password);
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["student"],undefined,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const updateStudent = {
    type: StudentType,
    description: "returns the Student updated",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
        career_id:{type:new GraphQLNonNull(GraphQLInt)},
        rol_id:{type:new GraphQLNonNull(GraphQLInt)},
        disability_detail_id:{type:new GraphQLNonNull(GraphQLInt)},
        gender_identity_id:{type:new GraphQLNonNull(GraphQLInt)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        run:{type:new GraphQLNonNull(GraphQLString)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        paternal_lname:{type:new GraphQLNonNull(GraphQLString)},
        maternal_lname:{type:new GraphQLNonNull(GraphQLString)},
        birth_date:{type:new GraphQLNonNull(GraphQLString)},
        experience:{type:GraphQLInt},
        updated_at:{type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","users_db", ["student"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement,"users_db");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            let hash= resp.rows[0].password;
            const isMatch = await comparePassword(args.lastPassword, hash);
            if(!isMatch){throw new Error("The password is incorrect")}
            delete args.lastPassword;
            args.password=await encPassword(args.password);
        } catch (error) {
            return error;
        }
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "users_db",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["student"],id,data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
const deleteStudent = {
    type: StudentType,
    description: "returns the Student deleted",
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","users_db", ["student"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "users_db");
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
module.exports = {
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
};