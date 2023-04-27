import axios from "axios";
import { APIKEY } from "../environments/environmentmodule";
import { APISECRET } from "../environments/environmentmodule";
import {generateJwtToken} from "./generateToken";
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
export default async (): Promise<meetingData> => {
// get list of all meetings of meetings associated with tutor bin or the host or creator of the meeting.
try {
      var data = await axios.get("https://api.zoom.us/v2/users/me/meetings/", {
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
