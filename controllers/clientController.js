import Client from "../models/Client.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const registerClient = async (req, res) => {
  const { companyName, phone } = req.body;

  if (!companyName || !phone) {
    throw new BadRequestError("please provide Company Name and Phone Number");
  }
  const userAlreadyExists = await Client.findOne({ companyName });
  const phoneAlreadyExists = await Client.findOne({ phone });

  if (userAlreadyExists || phoneAlreadyExists) {
    throw new BadRequestError("Company Name and Phone must be unique");
  }
  const client = await Client.create({ companyName, phone });

  res.status(StatusCodes.CREATED).json({
    client: {
      companyName: client.companyName,
      phone: client.phone,
      id: client._id,
    },
  });
};

const updateClient = async (req, res) => {
  const { companyName, phone } = req.body;
  if (!companyName || !phone) {
    throw new BadRequestError("please provide Company Name and Phone Number");
  }
  const client = await Client.findOne({ _id: req.user.clientId });

  client.companyName = companyName;
  client.phone = phone;

  await client.save();

  res.status(StatusCodes.OK).json({ client });
};

export { registerClient, updateClient };
