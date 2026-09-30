import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const createAddress = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fullName,
      addressLine1,
      addressLine2,
      area,
      city,
      state,
      pincode,
      country,
      latitude,
      longitude,
    } = req.body;

    if (
      typeof userId !== "string" ||
      typeof fullName !== "string" ||
      typeof addressLine1 !== "string" ||
      typeof area !== "string" ||
      typeof city !== "string" ||
      typeof state !== "string" ||
      typeof pincode !== "string"
    ) {
      return res.status(400).json({
        message: "Required address fields are missing",
      });
    }

    const address = await prisma.address.create({
      data: {
        userId,
        fullName,
        addressLine1,
        addressLine2,
        area,
        city,
        state,
        pincode,
        country: typeof country === "string" ? country : "India",
        latitude,
        longitude,
      },
    });

    return res.status(201).json({
      message: "Address created successfully",
      address,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create address",
    });
  }
};


export const getUserAddresses = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      addresses,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch addresses",
    });
  }
};



export const getAddress = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, addressId } = req.params;

    if (
      typeof userId !== "string" ||
      typeof addressId !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid userId or addressId",
      });
    }

    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    return res.status(200).json({
      address,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch address",
    });
  }
};



export const updateAddress = async (
  req: Request,
  res: Response
) => {
  try {
    const { addressId } = req.params;

    if (typeof addressId !== "string") {
      return res.status(400).json({
        message: "Invalid addressId",
      });
    }

    const {
      fullName,
      addressLine1,
      addressLine2,
      area,
      city,
      state,
      pincode,
      country,
      latitude,
      longitude,
    } = req.body;

    const existingAddress = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!existingAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    const address = await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        fullName,
        addressLine1,
        addressLine2,
        area,
        city,
        state,
        pincode,
        country,
        latitude,
        longitude,
      },
    });

    return res.status(200).json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update address",
    });
  }
};



export const deleteAddress = async (
  req: Request,
  res: Response
) => {
  try {
    const { addressId } = req.params;

    if (typeof addressId !== "string") {
      return res.status(400).json({
        message: "Invalid addressId",
      });
    }

    const existingAddress = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!existingAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    await prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    return res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete address",
    });
  }
};