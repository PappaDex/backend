import axios from "axios";
import { BACKEND_LOKALNO } from "../constants";

export const HttpService = axios.create({
  baseURL: BACKEND_LOKALNO,
  headers: {
    "Content-Type": "application/json",
  },
});
