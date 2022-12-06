import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../db/client";

/**
 * Get session from database
 */
export const getServerAuthSession = async (ctx: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: ctx.req.cookies.sessionToken,
    },
    include: { character: true },
  });
  if (!session) return null;
  return session;
};
