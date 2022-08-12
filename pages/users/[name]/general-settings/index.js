import { unstable_getServerSession } from "next-auth/next";
import { getData } from "../../../../src/utils/fetchData";
import { GeneralSettings } from "../../../../src/components/Forms";
import { MainLayout, SettingsLayout } from "../../../../src/components/Layout";
import { authOptions } from "../../../api/auth/[...nextauth]";

const GeneralSettingsPage = ({ userData }) => {
  return (
    <MainLayout>
      <SettingsLayout userData={userData}>
        <GeneralSettings userData={userData} />
      </SettingsLayout>
    </MainLayout>
  );
};

export default GeneralSettingsPage;

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

  return {
    props: {
      userData,
    },
  };
}
