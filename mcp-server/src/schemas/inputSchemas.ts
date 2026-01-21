/**
 * Zod validation schemas for tool inputs
 */

import { z } from "zod";
import { ResponseFormat } from "../types.js";

export const ConvertDocumentInputSchema = z.object({
  documentBase64: z.string()
    .min(1, "Document content is required")
    .describe("Base64-encoded Word document (.docx) to convert to IEEE format"),
  twoColumn: z.boolean()
    .default(false)
    .describe("Whether to format the document in two-column layout (IEEE optional format)"),
  outputFilename: z.string()
    .default("ieee_formatted.docx")
    .describe("Name for the output file (optional)")
}).strict();

export type ConvertDocumentInput = z.infer<typeof ConvertDocumentInputSchema>;

export const ValidateDocumentInputSchema = z.object({
  documentBase64: z.string()
    .min(1, "Document content is required")
    .describe("Base64-encoded Word document (.docx) to validate against IEEE standards"),
  responseFormat: z.nativeEnum(ResponseFormat)
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for machine-readable")
}).strict();

export type ValidateDocumentInput = z.infer<typeof ValidateDocumentInputSchema>;

export const GetFormattingGuideInputSchema = z.object({
  section: z.enum(["fonts", "margins", "code_blocks", "spacing", "all"])
    .default("all")
    .describe("Specific IEEE formatting section to retrieve: 'fonts', 'margins', 'code_blocks', 'spacing', or 'all' for complete guide"),
  responseFormat: z.nativeEnum(ResponseFormat)
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for machine-readable")
}).strict();

export type GetFormattingGuideInput = z.infer<typeof GetFormattingGuideInputSchema>;

export const AddCodeMarkersInputSchema = z.object({
  documentBase64: z.string()
    .min(1, "Document content is required")
    .describe("Base64-encoded Word document (.docx) where code block markers should be added"),
  codeBlockIndices: z.array(z.object({
    startParagraph: z.number()
      .int()
      .min(0)
      .describe("Zero-based index of the first paragraph in the code block"),
    endParagraph: z.number()
      .int()
      .min(0)
      .describe("Zero-based index of the last paragraph in the code block")
  }))
    .min(1, "At least one code block must be specified")
    .describe("Array of code block locations to mark with <code block start> and <code block end> markers"),
  outputFilename: z.string()
    .default("document_with_markers.docx")
    .describe("Name for the output file (optional)")
}).strict();

export type AddCodeMarkersInput = z.infer<typeof AddCodeMarkersInputSchema>;
