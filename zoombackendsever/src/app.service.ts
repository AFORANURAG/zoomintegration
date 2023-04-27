import { Injectable } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { generateJwtToken } from "../helpers/generateToken"
import { APIKEY } from "../environments/environmentmodule";
import { APISECRET } from "../environments/environmentmodule";
import axios from 'axios';
import meetings from "../helpers/allmeetings";
import meetingCreator from "../helpers/createmeeting";
import meetingWithId from "../helpers/meetingwithid";

// node js 18 introduces inbuilt fetch , but it is still very new and experimental , so we should go with a trusted fetch library.
// student is going to create the meeting on the behalf of tutor bin , and therefore we will have to apply many validations and constraints

let token: string = generateJwtToken(APIKEY, APISECRET);
interface payload {
  name?: string,
  age?: number
}
@Injectable()
export class AppService {
  async getHello() {
    await meetings();
    return 'Hello!';
  }
  async createMeeting(req: FastifyRequest, res: FastifyReply) {
    try {
      console.log(generateJwtToken(APIKEY, APISECRET));
      let responseFromZoom = await meetingCreator();
      console.log(responseFromZoom);
      res.status(201).send({ message: "meeting created successfully" });
    } catch (error) {
      console.log(`got an error while creating meeting.  error is ${error}`);
      res.status(500).send({ message: "server error", error: error.message })
    }
  }

 async getMeetings(req: FastifyRequest, res: FastifyReply) {
    try {
     // get list of all meetings associated with tutor bin or the host or creator of the meeting. 
     let allMeetings =  await meetings();
      res.status(200).send({ message: "meeting loaded successfully", allMeetings});
    } catch (error) {
      console.log(`error in the get meeting service method while loading the meeting`);
      res.status(error.str)
    }
}
async getMeetingWithMeetingId(req: FastifyRequest, res: FastifyReply){
  try {
    console.log(req.params);
    // get only one meeting with the given meeting id.
    let allMeetings =  await meetingWithId(req,res);
     res.status(200).send({ message: "meeting loaded successfully", allMeetings});
   } catch (error) {
     console.log(`error in the get meeting service method while loading the meeting`);
     res.status(error.status).send({ message:"got an error while loading the meeting",error:error.message});
   }
}
async getMeetingInvitation(req: FastifyRequest, res: FastifyReply){
  try {
    // let meetingId = req.params.meetingId;

        // get only one meeting with the given meeting id.
    let meetingInvitation = await axios.get(`https://api.zoom.us/v2/meetings/91731744820`, {
      headers: {
          Authorization: `Bearer ${generateJwtToken(APIKEY, APISECRET)}`,
          'Content-Type': 'application/json',
      },
  });
     res.status(200).send({ message: "meeting loaded successfully", meetingInvitation});
   } catch (error) {
     console.log(`error in the get meeting service method while loading the meeting`);
     res.status(error.str)
   }
}



}






// {
//   uuid: 'UnvUdrmJQw+iBS3McOcRig==',
//   id: 94680534160,
//   host_id: 'yr3ju2B0SHS2hZTy0OMoyQ',
//   topic: 'Test Meeting',
//   type: 2,
//   start_time: '2023-05-01T12:00:00Z',
//   duration: 60,
//   timezone: 'UTC',
//   created_at: '2023-04-27T11:00:55Z',
//   join_url: 'https://zoom.us/j/94680534160?pwd=SkVGMGJ6clcyQ3QrRlIvSk51ZmJ2Zz09'
// }
