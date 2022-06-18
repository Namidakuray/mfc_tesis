import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import {intranetQueryCtl, inputDataType} from '../../../db/intranetCtl';
const { CountryType, RegionType, CityType, RolType, AllowType, } = require("../../types");

const countries = {
    type: new GraphQLList(CountryType),
    description: "returns the country list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["country"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const countryById = {
    type: new GraphQLList(CountryType),
    description: "returns the country list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["country"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const regions = {
    type: new GraphQLList(RegionType),
    description: "returns the Region list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["Region"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const RegionById = {
    type: new GraphQLList(RegionType),
    description: "returns the Region list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["Region"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const cities = {
    type: new GraphQLList(CityType),
    description: "returns the City list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["city"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const cityById = {
    type: new GraphQLList(CityType),
    description: "returns the City list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["city"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const roles = {
    type: new GraphQLList(RolType),
    description: "returns the Rol list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["rol"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const rolById = {
    type: new GraphQLList(RolType),
    description: "returns the Rol list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["rol"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const allows = {
    type: new GraphQLList(AllowType),
    description: "returns the Allow list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["allow"]);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const allowById = {
    type: new GraphQLList(AllowType),
    description: "returns the Allow list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("SELECT",args.db, ["allow"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
module.exports = {
    countries,
    countryById,
    regions,
    RegionById,
    cities,
    cityById,
    roles,
    rolById,
    allows,
    allowById,
};