import { Container } from "@mui/material";
import ContactForm from "./../src/components/Forms";
import { MainLayout } from "../src/components/Layout";

const ContactPage = () => {
  return (
    <MainLayout title="Contact Us">
      <Container maxWidth="md" sx={{ py: 10 }}>
        <ContactForm />
      </Container>
    </MainLayout>
  );
};

export default ContactPage;
