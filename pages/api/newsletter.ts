import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
}
