import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import {studentQueryCtl, inputDataType} from '../../db/usersCtl';
import {comparePassword,encPassword, validateToken} from '../../services/utils/tools';
const {     
    StudentFederationType,
    StudentCenterType,
    StudentAddressType,
    StudentType,
} = require("../types");

const updateStudentFederation = {
    type: StudentFederationType,
    description: "returns the StudentFederation updated",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)}
    },
    resolve: async(_:null,args:any, {req}:any) => {
        if(!req.headers.verifiedUser||req.headers.userRole!=="student"){throw new Error("Unauthorized");}
        let studentData=validateToken(req.headers.userRole, req.headers.authorization.split(" ")[1]);
        if(typeof(studentData)=="string"||studentData.data.rol_id!==4){throw new Error("Unauthorized, only federation directive are able to do this.");}
        let fedUpdate;
        try {
            let studentStament = studentQueryCtl.statements("SELECT", ["student"],undefined,{columns:["id"],values:[req.headers.verifiedUser]});
            let studentResp= await studentQueryCtl.poolQuery(studentStament);
            let sedeStament = studentQueryCtl.statements("SELECT", ["sede","faculty","career"],+studentResp.rows[0].career_id,undefined,["INNER","INNER"],undefined);
            let sedeResp= await studentQueryCtl.poolQuery(sedeStament);
            let student_federationStament= studentQueryCtl.statements("SELECT",["student_federation"],undefined,{columns:["sede_id"],values:[sedeResp.rows[0].sede_id]});
            let student_federationResp= await studentQueryCtl.poolQuery(student_federationStament);
            if(studentResp.rows.length==0||sedeResp.rows.length==0||student_federationResp.rows.length==0){throw new Error("The petition has not been executed")}
            fedUpdate={
                federation_id:student_federationResp.rows[0].id,
                name:args.name,
                active:student_federationResp.rows[0].active,
                sede_id:sedeResp.rows[0].sede_id
            };
        } catch (error:any) {
            throw new Error(`${String(error)}`);
        }
        let id=fedUpdate.federation_id;
        delete fedUpdate.federation_id;
        let data:inputDataType = {
            columns:Object.keys(fedUpdate),
            values: Object.values(fedUpdate).toString().split(",")
        };
        try {
            let queryStatement = studentQueryCtl.statements("UPDATE", ["student_federation"],id,data);
            let resp= await studentQueryCtl.poolQuery(queryStatement);
            if(resp.rows.length==0){throw new Error("id not found")};
            return resp.rows[0];
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
    },
};
const updateStudentCenter = {
    type: StudentCenterType,
    description: "returns the StudentCenter updated",
    args: {
        name: {type:new GraphQLNonNull(GraphQLString)}
    },
    resolve: async(_:null,args:any, {req}:any) => {
        if(!req.headers.verifiedUser||req.headers.userRole!=="student"){throw new Error("Unauthorized");}
        let studentData=validateToken(req.headers.userRole, req.headers.authorization.split(" ")[1]);
        if(typeof(studentData)=="string"||studentData.data.rol_id!==3){throw new Error("Unauthorized, only student center directive are able to do this.");}
        let studentCenterUpdate;
        try {
            let studentStament = studentQueryCtl.statements("SELECT", ["student"],undefined,{columns:["id"],values:[req.headers.verifiedUser]});
            let studentResp= await studentQueryCtl.poolQuery(studentStament);
            let sedeStament = studentQueryCtl.statements("SELECT", ["sede","faculty","career"],+studentResp.rows[0].career_id,undefined,["INNER","INNER"],undefined);
            let sedeResp= await studentQueryCtl.poolQuery(sedeStament);
            let student_centerStament= studentQueryCtl.statements("SELECT",["student_center"],undefined,{columns:["career_id"],values:[sedeResp.rows[0].id]});
            let student_centerResp= await studentQueryCtl.poolQuery(student_centerStament);
            if(studentResp.rows.length==0||sedeResp.rows.length==0||student_centerResp.rows.length==0){throw new Error("The petition has not been executed")}
            studentCenterUpdate={
                studentCenter_id:student_centerResp.rows[0].id,
                name:args.name,
                active:student_centerResp.rows[0].active,
                career_id:sedeResp.rows[0].id
            };
        } catch (error:any) {
            throw new Error(`${String(error)}`);
        }
        let id=studentCenterUpdate.studentCenter_id;
        delete studentCenterUpdate.studentCenter_id;
        let data:inputDataType = {
            columns:Object.keys(studentCenterUpdate),
            values: Object.values(studentCenterUpdate).toString().split(",")
        };
        try {
            let queryStatement = studentQueryCtl.statements("UPDATE", ["student_center"],id,data);
            let resp= await studentQueryCtl.poolQuery(queryStatement);
            if(resp.rows.length==0){throw new Error("id not found")};
            return resp.rows[0];
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
    },
};
const addStudentAddress = {
    type: StudentAddressType,
    description: "returns the StudentAddress added",
    args: {
        city_id: {type:new GraphQLNonNull(GraphQLInt)},
        street_avenue: {type:new GraphQLNonNull(GraphQLString)},
        number: {type:new GraphQLNonNull(GraphQLInt)}
    },
    resolve: async(_:null,args:any, {req}:any) => {
        if(!req.headers.verifiedUser||req.headers.userRole!=="student"){throw new Error("Unauthorized");}
        let studentData=validateToken(req.headers.userRole, req.headers.authorization.split(" ")[1]);
        if(typeof(studentData)=="string"||studentData.data.id!==req.headers.verifiedUser){throw new Error("Unauthorized, only the student are able to added his address.");}
        args["student_id"]=studentData.data.id;
        let data:inputDataType = {
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = studentQueryCtl.statements("INSERT", ["student_address"],undefined,data);
            let resp= await studentQueryCtl.poolQuery(queryStatement);
            return resp.rows[0];
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
    },
};
const updateStudentAddress = {
    type: StudentAddressType,
    description: "returns the StudentAddress updated",
    args: {
        student_id: {type:GraphQLInt},
        city_id: {type:new GraphQLNonNull(GraphQLInt)},
        street_avenue: {type:new GraphQLNonNull(GraphQLString)},
        number: {type:new GraphQLNonNull(GraphQLInt)}
    },
    resolve: async(_:null,args:any, {req}:any) => {
        if(!req.headers.verifiedUser||req.headers.userRole!=="student"){throw new Error("Unauthorized");}
        let studentData=validateToken(req.headers.userRole, req.headers.authorization.split(" ")[1]);
        if(typeof(studentData)=="string"||(!args.student_id&&studentData.data.id!==req.headers.verifiedUser)||(args.student_id&&![2,3].includes(studentData.data.rol_id))){throw new Error("Unauthorized, only the student or student center members of his career are able to update the student address.");}
        let studentAddressUpdate;
        try {
            let studentResp;
            if(args.student_id){
                let studentStament = studentQueryCtl.statements("SELECT", ["student"],undefined,{columns:["id"],values:[args.student_id]});
                studentResp= await studentQueryCtl.poolQuery(studentStament);
            }else if(!args.student_id){
                let studentStament = studentQueryCtl.statements("SELECT", ["student"],undefined,{columns:["id"],values:[req.headers.verifiedUser]});
                studentResp= await studentQueryCtl.poolQuery(studentStament);
            }else{throw new Error("Error in the petition to obtain the student id");}
            if((studentResp.rows.length==0)){throw new Error("The petition has not been executed")}
            if(studentResp.rows[0].career_id==studentData.data.career_id&&args.student_id!==undefined){
                let addressStament = studentQueryCtl.statements("SELECT", ["student_address"],undefined,{columns:["student_id"],values:[args.student_id]});
                let addressResp= await studentQueryCtl.poolQuery(addressStament);
                studentAddressUpdate={
                    id:addressResp.rows[0].id,
                    student_id:addressResp.rows[0].student_id,
                    city_id: undefined,
                    street_avenue: undefined,
                    number: undefined
                };
            }else if(studentData.data.id==req.headers.verifiedUser&&args.student_id==undefined){
                let addressStament = studentQueryCtl.statements("SELECT", ["student_address"],undefined,{columns:["student_id"],values:[studentData.data.id]});
                let addressResp= await studentQueryCtl.poolQuery(addressStament);
                studentAddressUpdate={
                    id:addressResp.rows[0].id,
                    student_id:addressResp.rows[0].student_id,
                    city_id: undefined,
                    street_avenue: undefined,
                    number: undefined
                };
            }else{throw new Error("The student address don't exist.");
            };
        } catch (error:any) {
            throw new Error(`${String(error)}`);
        }
        studentAddressUpdate["city_id"]=args.city_id;
        studentAddressUpdate["street_avenue"]=args.street_avenue;
        studentAddressUpdate["number"]=args.number;
        let id=studentAddressUpdate.id;
        delete studentAddressUpdate.id;
        let data:inputDataType = {
            columns:Object.keys(studentAddressUpdate),
            values: Object.values(studentAddressUpdate).toString().split(",")
        };
        try {
            let queryStatement = studentQueryCtl.statements("UPDATE", ["student_address"],id,data);
            let resp= await studentQueryCtl.poolQuery(queryStatement);
            if(resp.rows.length==0){throw new Error("id not found")};
            return resp.rows[0];
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
    },
};
const updateStudent = {
    type: StudentType,
    description: "returns the Student updated",
    args: {
        lastPassword: {type:new GraphQLNonNull(GraphQLString)},
        password: {type:GraphQLString},
        disability_detail_id: {type:GraphQLInt},
        gender_identity_id: {type:GraphQLInt},
        name: {type:GraphQLString},
        paternal_lname: {type:GraphQLString},
        maternal_lname: {type:GraphQLString},
        birth_date: {type:GraphQLString},
    },
    resolve: async(_:null,args:any,{req}:any) => {
        if(!req.headers.verifiedUser||req.headers.userRole!=="student"){throw new Error("Unauthorized");}
        let studentData=validateToken(req.headers.userRole, req.headers.authorization.split(" ")[1]);
        if(typeof(studentData)=="string"||studentData.data.id!==req.headers.verifiedUser){throw new Error("Unauthorized, only the student are able to change his personal information.");}
        let studentUpdate;
        try {
            let studentStatement = studentQueryCtl.statements("SELECT", ["student"],studentData.data.id);
            let studentResp= await studentQueryCtl.poolQuery(studentStatement);
            if(studentResp.rows.length==0){throw new Error("The petition has not been executed")}
            let hash= studentResp.rows[0].password;
            const isMatch = await comparePassword(args.lastPassword, hash);
            if(!isMatch){throw new Error("The password is incorrect")}
            let nowTime=String(new Date(Date.now()).toISOString()).split("T")[0];
            let birth=new Date(studentResp.rows[0].birth_date).toISOString().split("T")[0];
            if(args.password){
                hash=await encPassword(args.password);
            }
            studentUpdate={
                id:studentData.data.id,
                email: studentResp.rows[0].email,
                password: hash, //password puede ser o no actualizada
                career_id: studentResp.rows[0].career_id, //sólo la federación puede actualizar la carrera
                rol_id: studentResp.rows[0].rol_id, //sólo centro de alumnos y federación pueden modificar el rol
                disability_detail_id: args.disability_detail_id||studentResp.rows[0].disability_detail_id,
                gender_identity_id: args.gender_identity_id||studentResp.rows[0].gender_identity_id,
                run: studentResp.rows[0].run, //sólo centro de alumnos y federación pueden modificar el RUN de alumnos
                name: args.name||studentResp.rows[0].name,
                paternal_lname: args.paternal_lname||studentResp.rows[0].paternal_lname,
                maternal_lname: args.maternal_lname||studentResp.rows[0].maternal_lname,
                birth_date: args.birth_date||birth,
                updated_at: nowTime
            };
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
        let id=studentUpdate.id;
        delete studentUpdate.id;
        let data:inputDataType = {
            columns:Object.keys(studentUpdate),
            values: Object.values(studentUpdate).toString().split(","),
        };
        try {
            let queryStatement = studentQueryCtl.statements("UPDATE", ["student"],id,data);
            let resp= await studentQueryCtl.poolQuery(queryStatement);
            return resp.rows[0];
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
    },
};
type studentCenterRoles= 1|2|3;
type federationRoles= 1|4|5;
const changeRole = {
    type: StudentType,
    description: "returns the Student updated",
    args: {
        student_id: {type:new GraphQLNonNull(GraphQLInt)},
        rol_id: {type:GraphQLInt},
        run: {type:GraphQLString},
        career_id: {type:GraphQLInt},
    },
    resolve: async(_:null,args:any,{req}:any) => {
        if(!req.headers.verifiedUser||req.headers.userRole!=="student"){throw new Error("Unauthorized");}
        let studentData=validateToken(req.headers.userRole, req.headers.authorization.split(" ")[1]);
        if(typeof(studentData)=="string"||studentData.data.id!==req.headers.verifiedUser||(args.student_id&&![3,4].includes(studentData.data.rol_id))){throw new Error("Unauthorized, only the directive are able to change the students Roles, Run and career.");}
        let studentUpdate;
        try {
            let studentStatement = studentQueryCtl.statements("SELECT", ["student"],args.student_id);
            let studentResp= await studentQueryCtl.poolQuery(studentStatement);
            if(studentResp.rows.length==0){throw new Error("The petition has not been executed")}
            let nowTime=String(new Date(Date.now()).toISOString()).split("T")[0];
            let birth=new Date(studentResp.rows[0].birth_date).toISOString().split("T")[0];
            studentUpdate={
                id:studentResp.rows[0].id,
                email: studentResp.rows[0].email,
                career_id: studentResp.rows[0].career_id,
                rol_id: studentResp.rows[0].rol_id, //sólo centro de alumnos y federación pueden modificar el rol
                disability_detail_id: studentResp.rows[0].disability_detail_id,
                gender_identity_id: studentResp.rows[0].gender_identity_id,
                run: args.run||studentResp.rows[0].run,//sólo centro de alumnos y federación pueden modificar el RUN de alumnos
                name: studentResp.rows[0].name,
                paternal_lname: studentResp.rows[0].paternal_lname,
                maternal_lname: studentResp.rows[0].maternal_lname,
                birth_date: birth,
                updated_at: nowTime,
            };
            if(studentData.data.rol_id==3){
                let newRole:studentCenterRoles=args.rol_id;
                studentUpdate["rol_id"]=newRole||studentResp.rows[0].rol_id;
            }else if(studentData.data.rol_id==4){
                let newRole:federationRoles=args.rol_id;
                studentUpdate["rol_id"]=newRole||studentResp.rows[0].rol_id;
                studentUpdate["career_id"]=args.career_id||studentResp.rows[0].career_id;
            }else{throw new Error("Unauthorized, only the directive are able to change the students Roles and Run.");}
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
        let id=studentUpdate.id;
        delete studentUpdate.id;
        let data:inputDataType = {
            columns:Object.keys(studentUpdate),
            values: Object.values(studentUpdate).toString().split(","),
        };
        try {
            let queryStatement = studentQueryCtl.statements("UPDATE", ["student"],id,data);
            let resp= await studentQueryCtl.poolQuery(queryStatement);
            return resp.rows[0];
        } catch (error) {
            throw new Error(`${String(error)}`);
        }
    },
}
const addStudent = {
    type: StudentType,
    description: "returns the Student added",
    args: {
        email: {type:new GraphQLNonNull(GraphQLString)},
        password: {type:new GraphQLNonNull(GraphQLString)},
        career_id: {type:new GraphQLNonNull(GraphQLInt)},
        rol_id: {type:new GraphQLNonNull(GraphQLInt)},
        disability_detail_id: {type:new GraphQLNonNull(GraphQLInt)},
        gender_identity_id: {type:new GraphQLNonNull(GraphQLInt)},
        run: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        paternal_lname: {type:new GraphQLNonNull(GraphQLString)},
        maternal_lname: {type:new GraphQLNonNull(GraphQLString)},
        birth_date: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any,{req}:any) => {
        if(!req.headers.verifiedUser&&req.headers.userRol!=="student"){throw new Error("Unauthorized");}
        let studentData=validateToken(req.headers.userRole, req.headers.authorization.split(" ")[1]);
        if(typeof(studentData)=="string"||studentData.data.rol_id==1){throw new Error("Unauthorized");}
        args.password=await encPassword(args.password);
        let data:inputDataType = {
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = studentQueryCtl.statements("INSERT", ["student"],undefined,data);
            let resp= await studentQueryCtl.poolQuery(queryStatement);
            return resp.rows[0];
        } catch (error) {
            return error;
        }
    },
};
module.exports = {
    updateStudentFederation,
    updateStudentCenter,
    addStudentAddress,
    updateStudentAddress,
    addStudent,
    updateStudent,
    changeRole,
};