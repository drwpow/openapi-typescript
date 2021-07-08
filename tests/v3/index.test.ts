import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { sanitizeLB } from "../test-utils";
import openapiTS from "../../src/index";

const cmd = `node ../../bin/cli.js`;
const schemas = fs.readdirSync(path.join(__dirname, "specs"));

describe("cli", () => {
  schemas.forEach((schema) => {
    it(`reads ${schema} spec (v3) from file`, async () => {
      const output = schema.replace(".yaml", ".ts");

      execSync(`${cmd} specs/${schema} -o generated/${output} --prettier-config .prettierrc`, {
        cwd: __dirname,
      });
      const [generated, expected] = await Promise.all([
        fs.promises.readFile(path.join(__dirname, "generated", output), "utf8"),
        fs.promises.readFile(path.join(__dirname, "expected", output), "utf8"),
      ]);
      expect(generated).toBe(sanitizeLB(expected));
    });

    it(`reads ${schema} spec (v3) from file (additional properties)`, async () => {
      const output = schema.replace(".yaml", ".additional.ts");

      execSync(`${cmd} specs/${schema} -o generated/${output} --prettier-config .prettierrc --additional-properties`, {
        cwd: __dirname,
      });
      const [generated, expected] = await Promise.all([
        fs.promises.readFile(path.join(__dirname, "generated", output), "utf8"),
        fs.promises.readFile(path.join(__dirname, "expected", output), "utf8"),
      ]);
      expect(generated).toBe(sanitizeLB(expected));
    });

    it(`reads ${schema} spec (v3) from file (immutable types)`, async () => {
      const output = schema.replace(".yaml", ".immutable.ts");

      execSync(`${cmd} specs/${schema} -o generated/${output} --prettier-config .prettierrc --immutable-types`, {
        cwd: __dirname,
      });
      const [generated, expected] = await Promise.all([
        fs.promises.readFile(path.join(__dirname, "generated", output), "utf8"),
        fs.promises.readFile(path.join(__dirname, "expected", output), "utf8"),
      ]);
      expect(generated).toBe(sanitizeLB(expected));
    });
  });

  it("reads spec (v3) from remote resource", async () => {
    execSync(
      `${cmd} https://raw.githubusercontent.com/drwpow/openapi-typescript/main/tests/v3/specs/manifold.yaml -o generated/http.ts`,
      { cwd: __dirname }
    );
    const [generated, expected] = await Promise.all([
      fs.promises.readFile(path.join(__dirname, "generated", "http.ts"), "utf8"),
      fs.promises.readFile(path.join(__dirname, "expected", "http.ts"), "utf8"),
    ]);
    expect(generated).toBe(sanitizeLB(expected));
  });
});

describe("json", () => {
  schemas.forEach((schema) => {
    it(`reads ${schema} from JSON`, async () => {
      const [schemaYAML, expected] = await Promise.all([
        fs.promises.readFile(path.join(__dirname, "specs", schema), "utf8"),
        fs.promises.readFile(path.join(__dirname, "expected", schema.replace(".yaml", ".ts")), "utf8"),
      ]);
      const schemaJSON = yaml.load(schemaYAML) as any;
      const generated = await openapiTS(schemaJSON, {
        prettierConfig: path.join(__dirname, "..", "..", ".prettierrc"),
      });
      expect(generated).toBe(sanitizeLB(expected));
    });
  });
});
