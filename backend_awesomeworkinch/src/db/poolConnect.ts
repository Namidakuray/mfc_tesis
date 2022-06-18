import {Pool, PoolConfig} from 'pg';
require('dotenv').config();

const clientConfig: PoolConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_CLIENT_USER,
    password: process.env.DB_CLIENT_PASSWORD,
    database: process.env.DB_CLIENT_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: false  
};
const intranetConfig: PoolConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_INTRANET_USER,
    password: process.env.DB_INTRANET_PASSWORD,
    database: process.env.DB_INTRANET_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: false  
};
const publicConfig: PoolConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_PUBLIC_USER,
    password: process.env.DB_PUBLIC_PASSWORD,
    database: process.env.DB_CLIENT_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: false  
};

const SingletonClient = (function () {
    let instance: Pool;
    function createInstance() {
        var classObj = new Pool(clientConfig);
        return classObj;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                console.log("Crea StudentPool");
            }
            else {
                console.log("Ya existe StudentPool");
            }
            return instance;
        },
    };
})();
const SingletonIntranet = (function () {
    let instance: Pool;
    function createInstance() {
        var classObj = new Pool(intranetConfig);
        return classObj;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                console.log("Crea IntranetPool");
            }
            else {
                console.log("Ya existe IntranetPool");
            }
            return instance;
        },
    };
})();
const SingletonPublic = (function () {
    let instance: Pool;
    function createInstance() {
        var classObj = new Pool(publicConfig);
        return classObj;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                console.log("Crea PublicPool");
            }
            else {
                console.log("Ya existe PublicPool");
            }
            return instance;
        },
    };
})();

module.exports = {
    SingletonClient,
    SingletonIntranet,
    SingletonPublic
};