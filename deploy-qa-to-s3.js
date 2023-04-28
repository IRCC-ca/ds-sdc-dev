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
        resolve(stdout.trim().replace("/", "-"));
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

const client = new AWS.S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ID,
    secretAccessKey: SECRET,
    sessionToken: SESSION,
  },
});

(async () => {
  let branhcName = await getBranch();
  if (!branhcName.startsWith("qa")) {
    console.log("Not sending to AWS ");
    return;
  }

  const response = await client.send(
    new AWS.PutObjectCommand({ Bucket: BUCKET_NAME, Key: `${branhcName}/` })
  );
  console.log("---");
  console.log("Connnecting to AWS", response);
  console.log("---");

  for await (const f of getFiles("./component-library/dist/demo-project")) {
    const path = f.split("demo-project/");
    // console.log(path[1]);
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
      console.log(`Uploaded: ./component-library/dist/demo-project/${path[1]}`);
    });
  }

  console.log(`Upload Done!`);
})();
