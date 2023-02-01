import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
} from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export const getServerSession = async (
  req: NextApiRequest | GetServerSidePropsContext["req"],
  res: NextApiResponse | GetServerSidePropsContext["res"]
) => {
  const session = await unstable_getServerSession(req, res, authOptions(req));
  return session;
};
