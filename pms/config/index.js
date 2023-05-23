const path = require("path");
require("dotenv").config({ path: ".env", silent: true });


module.exports = {
                    version: process.env.npm_package_version,
                    serviceName: process.env.npm_package_name,
                    appName: process.env.APP_NAME || "PMS",
                    port: process.env.PORT || 9010,
                    apiRoot: "/pms",
                    jwtSecret: process.env.JWT_SECRET,
                    root: process.env.ROOT_DIR,
                    db: {
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        port: process.env.DB_PORT,
                        database: process.env.DATABASE,
                    },
                    files: {
                        path: process.env.FILES_PATH
                    },
                    multerStorageDest: {
                        productImages: process.env.FILES_PATH
                      }
                };
