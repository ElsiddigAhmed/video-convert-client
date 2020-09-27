import socket from "socket.io-client";
import { API_HOST } from "../config";
export const apiUri = API_HOST;
const io = socket(apiUri);

export const sendStream = (url = "", data = {}) => {
  io.emit(url, data);
};
export const receiveStream = (url = "", cb) => {
  return io.on(url, (data) => cb(data));
};
