const axios = require("axios");
const fs = require("fs");

const pdfGen = (data) => {
  return new Promise((res, rej) => {
    data = JSON.parse(data);
    // console.log(data.name);
    const pdf = {
      from: "Ettarra Coffee House",
      to: data.name,
      logo: "logo.jpeg",
      number: 1,
      items: data.items,
      notes: "Thanks for your order! We hope you enjoy your coffee.",
    };
    // console.log(pdf);

    axios
      .post("https://invoice-generator.com", pdf, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "stream",
      })
      .then((response) => {
        const writer = fs.createWriteStream(`invoices/invoice${data.name}.pdf`);
        response.data.pipe(writer);
        console.log("Invoice PDF downloaded successfully!");
        writer.on("finish", () => {
          res(`invoices/invoice${data.name}.pdf`);
        });
        writer.on("error", (err) => {
          console.error("Error writing invoice PDF:", err);
          rej(err);
        });
      })
      .catch((error) => {
        console.error("Error downloading invoice PDF:", error);
        rej(error);
      });
  });
};

module.exports = pdfGen;
