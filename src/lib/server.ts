import axios from "axios";

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
});

export default server;
