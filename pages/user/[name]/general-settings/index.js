import { getSession } from "next-auth/react";
import Layout from "../../../../src/components/Layout";
import { getData } from "../../../../src/utils/fetchData";
import SettingsLayout from "../../../../src/components/User/Settings/SettingsLayout";
import { General } from "../../../../src/components/User/Settings";

const GeneralSettingsPage = ({ userData }) => {
  return (
    <Layout position="fixed">
      <SettingsLayout userData={userData}>
        <General userData={userData} />
      </SettingsLayout>
    </Layout>
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
