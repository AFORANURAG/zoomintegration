import axios from "axios";
import { APIKEY } from "../environments/environmentmodule";
import { APISECRET } from "../environments/environmentmodule";
import { generateJwtToken } from "./generateToken";

export default async (): Promise<void> => {
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



