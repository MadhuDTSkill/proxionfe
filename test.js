import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const PUBLIC_KEY_PATH = path.join(process.cwd(), "public.pem");
const PUBLIC_KEY = fs.readFileSync(PUBLIC_KEY_PATH, "utf8");

class APIKeysTokenDecoder {
  /** Decodes JWT token and extracts API key. */
  static decodeToken(token) {
    try {
      const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });

      return decoded.data;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
}

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFwaV9rZXkiOiIxMjM0NTY3ODkwYWJjZGVmIiwic2VydmljZSI6ImV4YW1wbGVfc2VydmljZSJ9fQ.Tghn9ZBivopabCGjIfE5TnJF_bnGN8WkTihvD7sch-6XpzpuC1dB7ytvn-ItadGKQGWDvr4sJZX64m5RS7_EYelcYab9xqRLNj-rIheN1qbQl_CZ2ccXThzHCtR9ncBo9kRWiRaK_7-kCCz_AWmY_eXYKRn7mqdjsiDf7NXTJQavdNNw8Ri2tX21ZhpKTf0tNcsvKccNxR-r9w20tYiIvG17k881KKGoZht0unpjytCSSpVCRBoifds1nTTGS7YchQ1LXxApYy8kVNWC4c35xMPIyG0PSrex8zxMnsMaVwzdW5fxxqT2DFtQkg0E9Uz4iNhfE7dkVudkx-LW-GUA1w";
const apiKeyData = APIKeysTokenDecoder.decodeToken(token);

console.log("Decrypted API Key Data:", apiKeyData);
