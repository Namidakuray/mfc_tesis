import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import {intranetQueryCtl, inputDataType} from '../../../db/intranetCtl';
const { CountryType, RegionType, CityType, RolType, AllowType, } = require("../../types");

const addCountry = {
    type: new GraphQLList(CountryType),
    description: "returns the country list",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["country"], undefined, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const updateCountry = {
    type: new GraphQLList(CountryType),
    description: "returns the country list",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["country"], id, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const deleteCountryById = {
    type: new GraphQLList(CountryType),
    description: "delete country by id",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE",args.db, ["country"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const addRegion = {
    type: new GraphQLList(RegionType),
    description: "returns the Region added",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        country_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["region"], undefined, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const updateRegion = {
    type: new GraphQLList(RegionType),
    description: "returns the Region list",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        country_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["region"], id, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const deleteRegionById = {
    type: new GraphQLList(RegionType),
    description: "delete Region by id",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE",args.db, ["region"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const addCity = {
    type: new GraphQLList(CityType),
    description: "returns the City added",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        capital: {type:new GraphQLNonNull(GraphQLBoolean)},
        region_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["city"], undefined, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const updateCity = {
    type: new GraphQLList(CityType),
    description: "returns the City list",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        capital: {type:new GraphQLNonNull(GraphQLBoolean)},
        region_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["city"], id, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const deleteCityById = {
    type: new GraphQLList(CityType),
    description: "delete City by id",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE",args.db, ["city"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const addRol = {
    type: new GraphQLList(RolType),
    description: "returns the Rol added",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        allow_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["rol"], undefined, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const updateRol = {
    type: new GraphQLList(RolType),
    description: "returns the Rol list",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
        allow_id: {type:new GraphQLNonNull(GraphQLInt)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["rol"], id, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const deleteRolById = {
    type: new GraphQLList(RolType),
    description: "delete Rol by id",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE",args.db, ["rol"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const addAllow = {
    type: new GraphQLList(AllowType),
    description: "returns the Allow added",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("INSERT",data.db, ["allow"], undefined, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const updateAllow = {
    type: new GraphQLList(AllowType),
    description: "returns the Allow list",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        db: {type:new GraphQLNonNull(GraphQLString)},
        name: {type:new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_:null,args:any) => {
        let id=args.id;
        delete args.id;
        let db=args.db;
        delete args.db;
        let data:inputDataType = {
            db: db,
            columns:Object.keys(args),
            values: Object.values(args).toString().split(",")
        };
        try {
            let queryStatement = intranetQueryCtl.statements("UPDATE",data.db, ["allow"], id, data);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, data.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
const deleteAllowById = {
    type: new GraphQLList(AllowType),
    description: "delete Allow by id",
    args: {
        db: {type:new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async(_:null,args:inputDataType) => {
        try {
            let queryStatement = intranetQueryCtl.statements("DELETE",args.db, ["allow"],args.id);
            let resp= await intranetQueryCtl.poolQuery(queryStatement, args.db);
            if(resp.rows.length==0){throw new Error("The petition has not been executed")}
            return resp.rows;
        } catch (error) {
            return error;
        }
    },
};
module.exports = {
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
    deleteAllowById,
};