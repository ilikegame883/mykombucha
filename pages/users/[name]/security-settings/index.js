import { unstable_getServerSession } from "next-auth/next";
import { MainLayout, SettingsLayout } from "../../../../src/components/Layout";
import { Security } from "../../../../src/components/Forms";
import { getData } from "../../../../src/utils/fetchData";
import { authOptions } from "../../../api/auth/[...nextauth]";

const SecuritySettingsPage = ({ userData }) => {
  return (
    <MainLayout>
      <SettingsLayout userData={userData}>
        <Security />
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
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const { username } = session.user;
  const [userData] = await getData("users", username);

  return { props: { userData } };
}
