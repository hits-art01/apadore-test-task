const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function validateForm(data) {
  const errors = {};

  const lettersOnly = /^[A-Za-zÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]+$/;

  if (!lettersOnly.test(data.firstName?.trim() || "")) {
    errors.firstName = "Invalid first name";
  }

  if (!lettersOnly.test(data.lastName?.trim() || "")) {
    errors.lastName = "Invalid last name";
  }

  if (!/^\+?\d{9,15}$/.test(data.phone || "")) {
    errors.phone = "Invalid phone number";
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email || "")) {
    errors.email = "Invalid email";
  }

  if (!data.consent) {
    errors.consent = "Consent is required";
  }

  return errors;
}

app.post("/api/contact", async (req, res) => {
  const data = req.body;

  const delay = Math.floor(Math.random() * 1000) + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < 0.5) {
    return res.status(500).json({
      message: "Random server error. Please try again.",
    });
  }

  const errors = validateForm(data);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  console.log("Received form:", data);

  res.status(200).json({
    message: "Form successfully submitted",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
