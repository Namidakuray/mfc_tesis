import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import {intranetQueryCtl, inputDataType } from '../../db/intranetCtl';
const { IntranetUserType, UserAddressType } = require("../types");


const intranetUsers = {
    type: new GraphQLList(IntranetUserType),
    description: "returns the IntranetUser list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["intranet_user"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const intranetUserById = {
    type: new GraphQLList(IntranetUserType),
    description: "returns the IntranetUser list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["intranet_user"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const usersAddress = {
    type: new GraphQLList(UserAddressType),
    description: "returns the UserAddress list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["user_address"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const userAddressById = {
    type: new GraphQLList(UserAddressType),
    description: "returns the UserAddress list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["user_address"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};

module.exports = {
    intranetUsers,
    intranetUserById,
    usersAddress,
    userAddressById,
};