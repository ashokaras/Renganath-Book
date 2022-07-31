import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestClient, resourceClientId) => {
  if (requestClient === resourceClientId.toString()) return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
