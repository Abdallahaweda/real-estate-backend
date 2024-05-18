import Listing from "../models/ListingModel.js";
import { errorHandeler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandeler(404, "List not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandeler(401, "You can only delete your own lists"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("List has been deleted successfully!");
  } catch (error) {
    next(error);
  }
};
