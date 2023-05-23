const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { root } = require("../config");


class Helpers {
    constructor() {}
  
    capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";
  
    searchForArrayInArrayOfArrays = (haystack, needle) => {
      for (let i = 0; i < haystack.length; i++) {
        if (needle.length !== haystack[i].length) continue;
        if (needle[0] === haystack[i][0] && needle[1] === haystack[i][1])
          return true;
      }
  
      return false;
    };

    encryptPassword = (password) => {

      const encrypted = CryptoJS.AES.encrypt(
        password,
        process.env.ENC_SECRET_KEY
      ).toString();

      return encrypted;
    }

    getSignedJwtToken = (id) => {

      return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

    };

    comparePasswordWithHash = (password, hash) => {
      return (
        password ==
        CryptoJS.AES.decrypt(hash, process.env.ENC_SECRET_KEY).toString(
          CryptoJS.enc.Utf8
        )
      );
    };

    getMulterImageUploader = (dest) => {
        const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, path.join(root, dest));
          },
          filename: function (req, file, cb) {
            let fileName = file.originalname.split(".")[0];
            fileName = fileName.split(" ").join("_");
            const fileExtension = file.originalname.split(".")[1];
            cb(null, `${fileName}-${Date.now()}.${fileExtension}`);
          },
        });
      
        const fileFilter = (req, file, cb) => {
          const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
          if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
          } else {
            cb(
              new Error(
                "Invalid file type. Only jpg, png, jpeg image files are allowed."
              ),
              false
            );
          }
        };
        return multer({
          storage,
          fileFilter,
          limits: {
            fileSize: 5 * 1024 * 1024,
          },
        });
    };
  

  }
  
  module.exports = new Helpers();
  