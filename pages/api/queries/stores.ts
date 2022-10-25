import awsGetStores from "../../../database/aws/dynamo-stores";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await awsGetStores();
  // if (req.method === "GET") {
  // } else {
  //   // Handle any other HTTP method
  // }
}
