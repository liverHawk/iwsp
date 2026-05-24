import { toNodeHandler } from "better-auth/node";
import { auth } from "../_auth";

export default toNodeHandler(auth);
