import axios from "axios";
import { APIKEY } from "../environments/environmentmodule";
import { APISECRET } from "../environments/environmentmodule";
import { generateJwtToken } from "./generateToken";
import { FastifyReply, FastifyRequest } from "fastify"


interface meetingdetailsparams {
    meetingId: string;
}
type meetingData = {
    uuid: string,
    id: number,
    host_id: string,
    topic: string,
    type: number,
    start_time: Date,
    duration: number,
    timezone: string,
    created_at: Date,
    join_url: string,
}


export default async (req: FastifyRequest, res: FastifyReply): Promise<meetingData> => {
    // dynamic routes for getting a particular  
    // let meetingId = req.params.meetingId;
    try {
        var data = await axios.get(`https://api.zoom.us/v2/meetings/91731744820`, {
            headers: {
                Authorization: `Bearer ${generateJwtToken(APIKEY, APISECRET)}`,
                'Content-Type': 'application/json',
            },
        });
        // console.log(data);
    } catch (error) {
        console.log(`got an error while making a get request. error is ${error}`);
    }
    console.log("here is the meeting details", data.data.meetings);
    return data.data.meetings;
}