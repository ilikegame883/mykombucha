const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

const handler = async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ err: "Error sending correction." });
  }
};

export default handler;
