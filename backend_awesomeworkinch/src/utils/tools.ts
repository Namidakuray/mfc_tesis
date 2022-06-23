require('dotenv').config();
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
export type InputDataUsersType = {
    id: string,
    career_id: string,
    rol_id: string,
    name: string,
    paternal_lname: string,
    maternal_lname: string,
    experience: string,
    created_at: string,
}
export type InputDataIntranetType = {
    id: string,
    name: string,
    paternal_lname: string,
    maternal_lname: string,
    rol_id: string,
}
type UserType= "users" | "intranet";

const arrAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;\:,./<>?~'.split('');
const arrAlphabetLength = arrAlphabet.length;

export const encPassword = async (password: string): Promise<string> => {
    let passkey:number = Math.floor((((arrAlphabet.findIndex(e=>e==password.split('')[-1])/arrAlphabetLength)/2)+((arrAlphabet.findIndex(e=>e==password.split('')[-2])/arrAlphabetLength)/2))*12);
    let passToHash = password.slice(0,-2);
    let salt = await bcrypt.genSalt(passkey);
    return await bcrypt.hash(passToHash, salt);
};
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    let passToHash = password.slice(0,-2);
    return await bcrypt.compare(passToHash, hash);
};

export const generateToken = (userType: UserType,data: InputDataUsersType|InputDataIntranetType): string => {
    if(userType=="users"){
        return jwt.sign({ data }, process.env.JWT_USERS_SECRET || "test", {
            expiresIn: "1d"
        });
    } else if(userType=="intranet"){
        return jwt.sign({ data }, process.env.JWT_INTRANET_SECRET || "test", {
            expiresIn: "1d"
        });
    }else{return "cant generate token"}
};
export const validateToken = (userType:UserType,token: string): string|JwtPayload => {
    try {
        if(userType=="users"){
            return jwt.verify(token, process.env.JWT_USERS_SECRET || "test");
        }else if(userType=="intranet"){
            return jwt.verify(token, process.env.JWT_INTRANET_SECRET || "test");
        }else{throw new Error("Invalid user type")};
    } catch (error) {
        return "Invalid token";
    }
};

/* let test = async (input: string) => {
    let x = await encPassword(input);
    console.log(x);
    let y = await comparePassword("123456789", x);
    console.log(y);
}
test('123456789'); */

/* let a=generateToken("Users",{id:"1",career_id:"1",rol_id:"1",name:"test",paternal_lname:"test",maternal_lname:"test",experience:"test",created_at:"test"});
let b=validateToken("Users",a);
console.log(b); */