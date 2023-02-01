import { Container } from "@mui/material";
import Contact from "../src/components/Contact";
import { MainLayout } from "../src/components/Layout";

const ContactPage = () => {
  return (
    <MainLayout title="Contact Us">
      <Container maxWidth="sm" sx={{ py: { xs: 5, sm: 8 } }}>
        <Contact />
      </Container>
    </MainLayout>
  );
};

export default ContactPage;
