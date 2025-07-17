const fs = require("fs");

const productName = process.argv[2];
const userName = process.argv[3];
fs.readFile("products.txt", "utf-8", (err, pdata) => {
  if (err) return console.log("Cannot read products file");
  const products = JSON.parse(pdata);
  const product = products.find(p => p.name === productName);

  if (!product || product.quantity <= 0) {
    console.log("Product not available");
    return;
  }

  fs.readFile("users.txt", "utf-8", (err, udata) => {
    if (err) return console.log("Cannot read users file");
    const users = JSON.parse(udata);
    const user = users.find(u => u.name == userName);

    if (!user) {
      console.log("User not found");
      return;
    }

    if (user.balance < product.price) {
      console.log("Insufficient balance");
      return;
    }
    product.quantity -= 1;
    user.balance -= product.price;
    fs.writeFile("products.txt", JSON.stringify(products, null, 2), (err) => {
      if (err) return console.log("Failed to update products");

      fs.writeFile("users.txt", JSON.stringify(users, null, 2), (err) => {
        if (err) return console.log("Failed to update users");

        const order = {
          user: user.name,
          product: product.name,
          amount: product.price
        };
        fs.appendFile("orderHistory.txt", JSON.stringify(order) + "\n", (err) => {
          if (err) return console.log("Failed to write order history");
          console.log("Order placed successfully!");
        });
      });
    });
  });
});