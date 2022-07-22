import { Container } from "@mui/material";
import Contact from "./../src/components/Contact";
import { MainLayout } from "../src/components/Layout";

const ContactPage = () => {
  return (
    <MainLayout title="Contact Us">
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Contact />
      </Container>
    </MainLayout>
  );
};

export default ContactPage;
