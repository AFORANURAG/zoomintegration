type accessToken = string;
import * as jwt from "jsonwebtoken";
const generateJwtToken = (APIKEY: string, APISECRET: string) => {
    const payload = {
        iss: APIKEY,
        exp: new Date().getTime() + 60 * 60 * 1000* 24 // Token expires in 1 day
    };
    const token = jwt.sign(payload, APISECRET);
    return token;
};

export { generateJwtToken }
