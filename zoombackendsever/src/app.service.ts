import { Injectable } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { generateJwtToken } from "../helpers/generateToken"
import { APIKEY } from "../environments/environmentmodule";
import { APISECRET } from "../environments/environmentmodule";
import axios from 'axios';
import meetings from "../helpers/allmeetings";
import meetingCreator from "../helpers/createmeeting";
// node js 18 introduces inbuilt fetch , but it is still very new and experimental , so we should go with a trusted fetch library.
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
     let allMeetings =  await meetings();
      res.status(200).send({ message: "meeting loaded successfully", allMeetings});
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



