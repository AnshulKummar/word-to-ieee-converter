/**
 * Tool for converting Word documents to IEEE format
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ConverterService } from "../services/converterService.js";
import { ConvertDocumentInputSchema, ConvertDocumentInput } from "../schemas/inputSchemas.js";

export function registerConvertTool(server: McpServer, converterService: ConverterService) {
  server.registerTool(
    "ieee_convert_document",
    {
      title: "Convert Word Document to IEEE Format",
      description: `Convert a Word document (.docx) to IEEE publication format.

This tool automatically applies IEEE formatting standards including:
- Margins: 0.75" top, 1.0" bottom, 0.625" left/right
- Fonts: Times New Roman for body text, Courier New for code
- Section headings with proper numbering (I., II., III.)
- Code blocks with bordered boxes and gray background
- Figure/table captions with proper formatting
- Single line spacing throughout
- Optional two-column layout

IMPORTANT: For code blocks to be properly formatted, you must add markers:
- Add '<code block start>' before code sections
- Add '<code block end>' after code sections
- The converter will automatically detect and format everything between these markers

Args:
  - documentBase64 (string): Base64-encoded Word document to convert
  - twoColumn (boolean): Whether to use two-column format (default: false)
  - outputFilename (string): Name for output file (default: "ieee_formatted.docx")

Returns:
  JSON object with:
  {
    "success": boolean,
    "message": string,
    "outputBase64": string,  // Base64-encoded converted document (if successful)
    "errors": string[]       // Error messages (if failed)
  }

Examples:
  - Use when: "Convert my research paper to IEEE format"
  - Use when: "Format this document with IEEE standards"
  - Use when: "Apply IEEE two-column layout to my paper"
  - Don't use when: Just checking formatting (use ieee_validate_document instead)

Error Handling:
  - Returns error if document is invalid or corrupted
  - Returns error if Python converter is not available
  - Returns error if conversion timeout (60 seconds)`,
      inputSchema: ConvertDocumentInputSchema,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (params: ConvertDocumentInput) => {
      try {
        const result = await converterService.convertDocument(
          params.documentBase64,
          params.twoColumn
        );

        const output = {
          success: result.success,
          message: result.message,
          ...(result.outputBase64 ? { outputBase64: result.outputBase64 } : {}),
          ...(result.errors ? { errors: result.errors } : {})
        };

        return {
          content: [{
            type: "text",
            text: JSON.stringify(output, null, 2)
          }],
          structuredContent: output
        };
      } catch (error: any) {
        const errorOutput = {
          success: false,
          message: "Conversion error",
          errors: [error.message]
        };

        return {
          content: [{
            type: "text",
            text: JSON.stringify(errorOutput, null, 2)
          }],
          structuredContent: errorOutput
        };
      }
    }
  );
}
