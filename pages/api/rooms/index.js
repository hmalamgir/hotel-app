import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { createRoom, getAllRooms } from "../../../controllers/roomController";
import onError from "../../../middlewares/error";

const handler = nc({ onError });

dbConnect();

handler.get(getAllRooms).post(createRoom);

export default handler;
