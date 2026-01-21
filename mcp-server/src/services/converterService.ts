/**
 * Service for converting Word documents to IEEE format
 * Uses Python converter (word_to_ieee.py) for reliable document manipulation
 */

import { execFile } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomBytes } from "crypto";
import { ConversionResult } from "../types.js";

const execFileAsync = promisify(execFile);

export class ConverterService {
  private pythonScriptPath: string;

  constructor(pythonScriptPath: string) {
    this.pythonScriptPath = pythonScriptPath;
  }

  /**
   * Convert a Word document to IEEE format using the Python converter
   */
  async convertDocument(
    inputBase64: string,
    twoColumn: boolean = false
  ): Promise<ConversionResult> {
    const tempId = randomBytes(16).toString("hex");
    const inputPath = join(tmpdir(), `input_${tempId}.docx`);
    const outputPath = join(tmpdir(), `output_${tempId}.docx`);

    try {
      // Write input file
      const inputBuffer = Buffer.from(inputBase64, "base64");
      await writeFile(inputPath, inputBuffer);

      // Build command arguments
      const args = [this.pythonScriptPath, inputPath, outputPath];
      if (twoColumn) {
        args.push("--two-column");
      }

      // Execute Python converter
      try {
        const { stdout, stderr } = await execFileAsync("python", args, {
          timeout: 60000 // 60 second timeout
        });

        if (stderr && stderr.includes("Error")) {
          throw new Error(stderr);
        }
      } catch (error: any) {
        throw new Error(`Conversion failed: ${error.message}`);
      }

      // Read and encode output
      const outputBuffer = await readFile(outputPath);
      const outputBase64 = outputBuffer.toString("base64");

      // Cleanup
      await Promise.all([
        unlink(inputPath).catch(() => {}),
        unlink(outputPath).catch(() => {})
      ]);

      return {
        success: true,
        message: `Document successfully converted to IEEE format${twoColumn ? " (two-column)" : ""}`,
        outputBase64
      };
    } catch (error: any) {
      // Cleanup on error
      await Promise.all([
        unlink(inputPath).catch(() => {}),
        unlink(outputPath).catch(() => {})
      ]);

      return {
        success: false,
        message: "Conversion failed",
        errors: [error.message]
      };
    }
  }

  /**
   * Validate a Word document against IEEE standards
   * Returns basic validation info
   */
  async validateDocument(inputBase64: string): Promise<any> {
    try {
      // Decode input
      const inputBuffer = Buffer.from(inputBase64, "base64");

      // Basic validation - check if it's a valid .docx file
      if (inputBuffer.length < 100) {
        return {
          isValid: false,
          message: "Invalid document: file is too small",
          issues: ["Document appears to be corrupted or empty"]
        };
      }

      // Check for ZIP signature (DOCX files are ZIP archives)
      const zipSignature = inputBuffer.toString("hex", 0, 4);
      if (zipSignature !== "504b0304") {
        return {
          isValid: false,
          message: "Invalid document: not a valid .docx file",
          issues: ["File is not a valid Word document (ZIP format expected)"]
        };
      }

      return {
        isValid: true,
        message: "Document structure is valid",
        note: "Use ieee_convert_document to ensure full IEEE compliance with proper formatting."
      };
    } catch (error: any) {
      return {
        isValid: false,
        message: "Validation error",
        errors: [error.message || String(error)]
      };
    }
  }

  /**
   * Add code block markers to a document
   * This is a simplified version - full implementation would manipulate the document
   */
  async addCodeMarkers(
    inputBase64: string,
    codeBlockIndices: Array<{ startParagraph: number; endParagraph: number }>
  ): Promise<ConversionResult> {
    return {
      success: false,
      message: "This feature requires document manipulation. Please manually add markers:",
      errors: [
        "Add '<code block start>' before your code",
        "Add '<code block end>' after your code",
        "Then use ieee_convert_document to format the document"
      ]
    };
  }
}
