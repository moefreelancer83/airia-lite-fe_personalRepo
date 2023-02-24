import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles the API request and sends a "Hello world!" response.
 * @param req The incoming API request.
 * @param res The outgoing API response.
 * @returns A Promise that resolves to void.
 */
export default async function handleApiRequest(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.send("Hello world!");
}
