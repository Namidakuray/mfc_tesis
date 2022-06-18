import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import {intranetQueryCtl, inputDataType} from '../../db/intranetCtl';
const { IntranetUserType, UserAddressType } = require("../types");
import {comparePassword,encPassword} from '../../utils/tools';

const addIntranetUser = {
    type: new GraphQLList(IntranetUserType),
    description: "returns the IntranetUser added",
    args: {
        run:{type:new GraphQLNonNull(GraphQLString)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        paternal_lastname:{type:new GraphQLNonNull(GraphQLString)},
        maternal_lastname:{type:new GraphQLNonNull(GraphQLString)},
        born_date:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
        rol_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        args.password=await encPassword(args.password);
        let data:inputDataType = {
            db: "intranet",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["intranet_user"], undefined, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};
const updateIntranetUser = {
    type: new GraphQLList(IntranetUserType),
    description: "returns the IntranetUser list",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        run:{type:new GraphQLNonNull(GraphQLString)},
        active:{type:new GraphQLNonNull(GraphQLBoolean)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        paternal_lastname:{type:new GraphQLNonNull(GraphQLString)},
        maternal_lastname:{type:new GraphQLNonNull(GraphQLString)},
        born_date:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
        lastPassword: {type:new GraphQLNonNull(GraphQLString)},
        rol_id:{type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT","intranet",["intranet_user"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "intranet");
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
            db: "intranet",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["intranet_user"], id, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const deleteIntranetUserById = {
    type: new GraphQLList(IntranetUserType),
    description: "delete IntranetUser by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","intranet", ["intranet_user"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "intranet");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const addUserAddress = {
    type: new GraphQLList(UserAddressType),
    description: "returns the UserAddress added",
    args: {
        intranet_user_id:{type:new GraphQLNonNull(GraphQLInt)},
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let data:inputDataType = {
            db: "intranet",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["user_address"], undefined, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const updateUserAddress = {
    type: new GraphQLList(UserAddressType),
    description: "returns the UserAddress list",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        intranet_user_id:{type:new GraphQLNonNull(GraphQLInt)},
        city_id:{type:new GraphQLNonNull(GraphQLInt)},
        street_avenue:{type:new GraphQLNonNull(GraphQLString)},
        number:{type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let data:inputDataType = {
            db: "intranet",
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["user_address"], id, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const deleteUserAddressById = {
    type: new GraphQLList(UserAddressType),
    description: "delete UserAddress by id",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE","intranet", ["user_address"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, "intranet");
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};

module.exports = {
    addIntranetUser,
    updateIntranetUser,
    deleteIntranetUserById,
    addUserAddress,
    updateUserAddress,
    deleteUserAddressById,
};