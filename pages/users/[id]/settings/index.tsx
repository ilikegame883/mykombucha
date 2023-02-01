import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { MainLayout } from "../../../../src/components/Layout";
import { authOptions } from "../../../api/auth/[...nextauth]";
import Header from "../../../../src/components/Settings/Header";
import Settings from "../../../../src/components/Settings";

const SettingsPage = ({ session }) => {
  return (
    <MainLayout title="account-settings">
      <Header />
      <Settings userId={session.user.id} provider={session.provider} />
    </MainLayout>
  );
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions(context.req)
  );
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return { props: { session: session } };
};
