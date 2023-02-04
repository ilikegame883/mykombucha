import type { NextApiRequest, NextApiResponse } from "next";

const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return;

  const { email, correction, checked, name, type } = req.body;

  const checkedItems = checked.join(", ");

  const message = `
        <strong>From: </strong> ${email}<br>
        <br>
        <strong>Name: </strong> ${name} - ${type}<br>
        <br>
        <strong>Correction: </strong> ${checkedItems}<br>
        <br>
        <strong>Details: </strong> ${correction}
      `;
  try {
    await mail.send({
      to: process.env.E_MAIL,
      from: "corrections@mykombucha.net",
      subject: `Correction for ${type}`,
      text: message,
      html: message.replace(/\r\n/g, "<br>"),
    });

    res.status(200).json({ msg: "Correction Sent!" });
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
