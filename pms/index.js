const App = require("./app");

async function gracefulShutdown(signal) {
  console.log(
    `[PMS_MNGT_SERVICE] ${signal} signal received: shutting down service`
  );

  await App.stop();
  setTimeout(() => process.exit(0), 1500);
}

(async () => {
  await App.start();

  process.on("SIGTERM", async () => await gracefulShutdown("SIGTERM"));
  process.on("SIGINT", async () => await gracefulShutdown("SIGINT"));
})();
