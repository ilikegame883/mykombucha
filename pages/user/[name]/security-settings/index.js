import { getSession } from "next-auth/react";
import Layout from "../../../../src/components/Layout";
import Security from "../../../../src/components/User/Settings/Security";
import SettingsLayout from "../../../../src/components/User/Settings/SettingsLayout";
import { getData } from "../../../../src/utils/fetchData";

const SecuritySettingsPage = ({ userData }) => {
  return (
    <Layout position="fixed">
      <SettingsLayout userData={userData}>
        <Security />
      </SettingsLayout>
    </Layout>
  );
};

export default SecuritySettingsPage;

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

  return { props: { userData } };
}
