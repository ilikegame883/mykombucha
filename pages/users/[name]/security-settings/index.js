import { unstable_getServerSession } from "next-auth/next";
import { MainLayout, SettingsLayout } from "../../../../src/components/Layout";
import { Security } from "../../../../src/components/Forms";
import { getData } from "../../../../src/utils/fetchData";
import { authOptions } from "../../../api/auth/[...nextauth]";

const SecuritySettingsPage = ({ userData, provider }) => {
  return (
    <MainLayout>
      <SettingsLayout userData={userData}>
        <Security provider={provider} />
      </SettingsLayout>
    </MainLayout>
  );
};

export default SecuritySettingsPage;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const { username, provider } = session.user;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [userData] = await getData("users", username);

  return { props: { userData, provider } };
}
