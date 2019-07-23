import { url } from 'inspector';


const urls = {
    local: `http://localhost:5000`,
    prod: 'https://chat-me-message.herokuapp.com'
}

const currentURL = (process.env.NODE_ENV !== 'development') ? urls.prod : urls.local;

export const BASE_URL = `${currentURL}/api`;