import { Container } from "@mui/material";
import ContactForm from "./../src/components/Forms";
import Layout from "../src/components/Layout";

const ContactPage = () => {
  return (
    <Layout title="Contact Us">
      <Container maxWidth="md" sx={{ py: 10 }}>
        <ContactForm />
      </Container>
    </Layout>
  );
};

export default ContactPage;
