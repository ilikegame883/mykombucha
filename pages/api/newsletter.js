export default async function handler(req, res) {
  if (req.method !== "PUT") return;

  const contactData = {
    contacts: [{ email: `${req.body.mail}` }],
    list_ids: [process.env.SENDGRID_MAILING_ID],
  };

  try {
    await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify(contactData),
    });
    return res.json({
      msg: "Your email has been succesfully added to the mailing list.",
    });
  } catch (err) {
    return res.status(500).json({
      err: "There was a problem, please try again or contact us.",
    });
  }
}
