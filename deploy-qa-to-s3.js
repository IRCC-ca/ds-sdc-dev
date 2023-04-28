import * as AWS from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { exec } from "child_process";
import { resolve } from "path";
import { readdir } from "node:fs/promises";
import * as fs from "fs";
import * as mime from "mime-types";

const getBranch = () =>
  new Promise((resolve, reject) => {
    return exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
      if (err) reject(`getBranch Error: ${err}`);
      else if (typeof stdout === "string")
        resolve(stdout.trim().replaceAll("/", "-").toLowerCase());
    });
  });

const UploadFile = (branhcName, path, client) =>
  new Promise((resolve, reject) => {
    const fileObject = fs.readFileSync(
      `./component-library/dist/demo-project/${path[1]}`
    );
    const upload = new Upload({
      client: client,
      params: {
        Bucket: BUCKET_NAME,
        Key: `${branhcName}/${path[1]}`,
        Body: fileObject,
        ContentType: mime.lookup(
          `./component-library/dist/demo-project/${path[1]}`
        ),
      },
    });

    upload.done().then((res, error) => {
      resolve(`Uploaded: ./component-library/dist/demo-project/${path[1]}`);
    });
  });

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const SESSION = process.env.AWS_SESSION_TOKEN;
const REGION = "ca-central-1";
const BUCKET_NAME = "jl-ds-qa-test";
const params = {
  region: "REGION",
};

(async () => {
  let branhcName = await getBranch();
  if (!branhcName.startsWith("qa")) {
    console.log("\x1b[34m%s\x1b[0m", "Not sending branch to QA");
    return;
  }

  if (ID === undefined || SECRET === undefined || SESSION === undefined) {
    console.log("\x1b[31m%s\x1b[0m", "Please enter your AWS Credentials");
    return;
  }

  const client = new AWS.S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ID,
      secretAccessKey: SECRET,
      sessionToken: SESSION,
    },
  });

  const response = await client.send(
    new AWS.PutObjectCommand({ Bucket: BUCKET_NAME, Key: `${branhcName}/` })
  );
  console.log("---");
  console.log("Connnecting to AWS", response);
  console.log("---");

  for await (const f of getFiles("./component-library/dist/demo-project")) {
    const path = f.split("demo-project/");
    console.log(await UploadFile(branhcName, path, client));
  }

  console.log(`Upload Done!`);
  console.log(
    `Visit your QA site at: https://jl-ds-qa-test.s3.ca-central-1.amazonaws.com/${branhcName}/index.html`
  );
})();
