/**
 * Tool for validating Word documents against IEEE standards
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ConverterService } from "../services/converterService.js";
import { ValidateDocumentInputSchema, ValidateDocumentInput } from "../schemas/inputSchemas.js";
import { ResponseFormat } from "../types.js";

export function registerValidateTool(server: McpServer, converterService: ConverterService) {
  server.registerTool(
    "ieee_validate_document",
    {
      title: "Validate Document Against IEEE Standards",
      description: `Validate a Word document against IEEE formatting standards.

This tool checks if a document meets IEEE publication requirements for:
- Font types and sizes
- Margin dimensions
- Line spacing
- Code block formatting
- Caption formatting

NOTE: This is currently a placeholder feature. For full IEEE compliance,
use the ieee_convert_document tool which automatically applies all standards.

Args:
  - documentBase64 (string): Base64-encoded Word document to validate
  - responseFormat ("markdown" | "json"): Output format (default: "markdown")

Returns:
  For JSON format:
  {
    "isValid": boolean,
    "message": string,
    "note": string
  }

Examples:
  - Use when: "Check if my document meets IEEE standards"
  - Use when: "Validate this paper against IEEE format"
  - Don't use when: You want to convert (use ieee_convert_document instead)

This is a read-only analysis tool with no side effects.`,
      inputSchema: ValidateDocumentInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (params: ValidateDocumentInput) => {
      try {
        const result = await converterService.validateDocument(params.documentBase64);

        if (params.responseFormat === ResponseFormat.JSON) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify(result, null, 2)
            }],
            structuredContent: result
          };
        } else {
          // Markdown format
          let markdown = `# IEEE Document Validation\n\n`;
          markdown += `**Status**: ${result.isValid ? "✓ Valid" : "✗ Issues Found"}\n\n`;
          markdown += `**Message**: ${result.message}\n\n`;
          if (result.note) {
            markdown += `**Note**: ${result.note}\n`;
          }

          return {
            content: [{
              type: "text",
              text: markdown
            }]
          };
        }
      } catch (error: any) {
        return {
          content: [{
            type: "text",
            text: `Error validating document: ${error.message}`
          }]
        };
      }
    }
  );
}
