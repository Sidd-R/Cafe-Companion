const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { storeOrder } = require("./storeSQL");
const pdfGen = require("./mail");
const { storeReview } = require("./storeReview");

const {
  Client,
  LocalAuth,
  MessageMedia,
  Location,
  Buttons,
} = require("whatsapp-web.js");

const spawner = require("child_process").spawn;

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: ".wwebjs_cache",
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.clear();
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  //   console.log(message.body);

  // Send basic message
  if (message.body === "!ping") {
    await message.reply("pong");
  }

  // Send Location
  if (message.body === "!location") {
    await message.reply(new Location(19.1014, 72.8274, "Ettarra Coffee House"));
  }

  if (message.body.startsWith("!order")) {
    const from = message.from.split("@")[0];
    const order = from + " " + message.body.split(" ").slice(1).join(" ");
    await message.reply(`Order received from: ${order}`);
    const json_data = spawner("python", ["llm.py", order]);
    json_data.stdout.on("data", async (data) => {
      temp = data.toString();
      storeOrder(temp);
      const processItems = () => {
        temp = JSON.parse(temp);
        temp.items.forEach((item) => {
          item.unit_cost = 270;
          delete item.type;
        });
      };
      processItems();
      // console.log(temp);
      temp = JSON.stringify(temp);
      const pdfPath = pdfGen(temp).then((pdfPath) => {
        const pdf = MessageMedia.fromFilePath(pdfPath);
        client.sendMessage(message.from, pdf, "Your invoice is ready!");
      });
      // const pdf = MessageMedia.fromFilePath(pdfPath);
      // await client.sendMessage(message.from, pdf, "Your invoice is ready!");
    });
  }

  if (message.body.startsWith("!review")) {
    const review = message.body.split(" ").slice(1).join(" ");
    console.log(review);
    const from = message.from.split("@")[0];
    const stars = spawner("python", ["stars.py", review]);
    stars.stdout.on("data", async (data) => {
      console.log(data.toString());
      const new_review = {
        from: from,
        comment: review,
        stars: parseInt(data.toString()[0]),
      };
      console.log(new_review);
      storeReview(new_review);
      console.log("Review stored!");
    });
    await message.reply(
      "Thank you for your review! We will get back to you soon."
    );
  }
});

client.initialize();
