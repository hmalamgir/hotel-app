import Room from "../models/roomModel";
import asyncHandlerError from "../middlewares/asyncHandlerError";

// get all rooms =============> api/rooms
const getAllRooms = asyncHandlerError(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms,
  });
});

// create new room =========> /api/rooms
const createRoom = asyncHandlerError(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({
    success: true,
    room,
  });
});

// get single room =========> /api/rooms/:id
const getSingleRoom = asyncHandlerError(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new Error("Room is not found with this ID.", 404));
  }

  res.status(200).json({
    success: true,
    data: room,
  });
});

// Update room details ==========>   /api/rooms/:id
const updateRoom = asyncHandlerError(async (req, res) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    data: room,
  });
});

// Delete room   =>   /api/rooms/:id
const deleteRoom = asyncHandlerError(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  // Delete images associated with the room
  // for (let i = 0; i < room.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(room.images[i].public_id);
  // }

  await room.remove();

  res.status(200).json({
    success: true,
    message: `Room id:${req.query.id} is deleted.`,
  });
});

module.exports = {
  getAllRooms,
  createRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
