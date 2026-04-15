import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

export class DataProvider {
  // ====================================================
  // Synchronous JSON Loading (for module-level loading)
  // ====================================================
  static getDataFromJsonSync(filePath: string): any {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading JSON file at ${filePath}:`, error);
      throw error;
    }
  }

  // ====================================================
  // Asynchronous JSON Loading (for async contexts)
  // ====================================================
  static async getDataFromJson(filePath: string): Promise<any> {
    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading JSON file at ${filePath}:`, error);
      throw error;
    }
  }

  static async getDataFromCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(filePath)
        .pipe(parse({ columns: true }))
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => {
          console.error(`Error reading CSV file at ${filePath}:`, error);
          reject(error);
        });
    });
  }
}
