import { getSession } from "next-auth/react";
import { MainLayout, SettingsLayout } from "../../../../src/components/Layout";
import { Security } from "../../../../src/components/Forms";
import { getData } from "../../../../src/utils/fetchData";

const SecuritySettingsPage = ({ userData }) => {
  return (
    <MainLayout position="fixed">
      <SettingsLayout userData={userData}>
        <Security />
      </SettingsLayout>
    </MainLayout>
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
