require("dotenv").config();
import express, {Application, Request, Response} from 'express';
import { graphqlHTTP } from "express-graphql";
import { usersAuthenticate, intranetAuthenticate } from './middleware/auth';


export class App{
    private _app: Application;
    private _port?: number;

    constructor(port?:number|string){
        this._app=express();
        this.settings(port);
        this.middleware();
        this.routes();
    }
    /* Settings */
    private settings(port?:number|string){
        if(port){
            if(typeof port==="string"){this._port = parseInt(port)
            }else{this._port=port};
        }
        this._app.set("port", this._port||process.env.PORT||3000)
        this._app.set("algorithm", process.env.ALGORITHM||"RS256")
    }
    /* Middleware */
    private middleware(){
        this._app.use(express.urlencoded({extended:false}));
        this._app.use(express.json());
        this._app.use("/api/intranet/graphql",intranetAuthenticate);
        this._app.use("/api/users/graphql",usersAuthenticate);
    }
    /* Routes */
    private routes(){
        this._app.use("/api/intranet/graphql",graphqlHTTP((req,res)=>{
            return {
                schema:require("./graphql/intranet/schema"),
                graphiql:true,
                context:{req,res}
            }
        }));
        this._app.use("/api/users/graphql",graphqlHTTP((req,res)=>{
            return {
                schema:require("./graphql/users/schema"),
                graphiql:true,
                context:{req,res}
            }
        }));
    }
    public listen():void{
        this._app.listen(this._app.get("port"));
        console.log("Auth_server listen on port", this._app.get("port"));
    }
};