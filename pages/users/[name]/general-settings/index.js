import { getSession } from "next-auth/react";
import { getData } from "../../../../src/utils/fetchData";
import { GeneralSettings } from "../../../../src/components/Forms";
import { MainLayout, SettingsLayout } from "../../../../src/components/Layout";

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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

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
