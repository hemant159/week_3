import { Router } from "express";

import {
  createAddress,
  getUserAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
} from "../controller/Address.controller";

const router = Router();

router.post("/", createAddress);

router.get("/user/:userId", getUserAddresses);

router.get("/user/:userId/:addressId", getAddress);

router.put("/:addressId", updateAddress);

router.delete("/:addressId", deleteAddress);

export default router;