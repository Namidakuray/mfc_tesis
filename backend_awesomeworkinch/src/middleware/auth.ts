import {Request,Response,NextFunction} from 'express';
import {validateToken} from '../utils/tools';


export const usersAuthenticate = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    const verified = validateToken("users", token);
    if (typeof(verified)=="object") {
      req.headers.verifiedUser = verified.data.id;
      req.headers.userRole = "users";
      next();
    }else{
      throw new Error("The token is invalid");
    }
  } catch (error) {
    console.log("public access");
    req.headers.userRole = "public";
    next();
  }
};
export const intranetAuthenticate = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    const verified = validateToken("intranet", token);
    if (typeof(verified)=="object") {
      req.headers.verifiedUser = verified.data.id;
      req.headers.userRole = "intranet";
      next();
    }else{
      throw new Error("The token is invalid");
    }
  } catch (error) {
    res.json({error: "You must be logged in to be able to access this route"});
  }
};