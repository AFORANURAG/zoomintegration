import { Injectable } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { generateJwtToken } from "../helpers/generateToken"
import { JWT } from "../environmentmodule";
import { APIKEY } from "../environmentmodule";
import { APISECRET } from "../environmentmodule";
import axios from 'axios';
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
      console.log(`got an error while creating meeting.error is ${error}`);
      res.status(500).send({ message: "server error", error: error.message })
    }
  }
  async getMeetings(req: FastifyRequest, res: FastifyReply) {
    try {
      await meetings();
      res.status(200).send({ message: "meeting loaded successfully" });
    } catch (error) {
      console.log(`error in the get meeting service method while loading the meeting`);
    }
  }
}

const meetingCreator = async (): Promise<void> => {
  const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
    topic: 'Test Meeting',
    type: 2, // Scheduled meeting
    start_time: '2023-05-01T12:00:00Z',
    duration: 60,
    timezone: 'UTC',
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: true,
      mute_upon_entry: true,
      approval_type: 2,
      auto_recording: 'cloud',
      waiting_room: true,
      registrants_email_notification: true,
    },
  }, {
    headers: {
      Authorization: `Bearer ${generateJwtToken(APIKEY, APISECRET)}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data);
};



const meetings = async (): Promise<void> => {
  try {
    var data = await axios.get("https://api.zoom.us/v2/users/me/meetings/",{
      headers: {
        Authorization: `Bearer ${generateJwtToken(APIKEY, APISECRET)}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(data);
  } catch (error) {
    console.log(`got an error while making a get request. error is ${error}`);
  }
  console.log("here is the meeting details",data.data.meetings);
}
