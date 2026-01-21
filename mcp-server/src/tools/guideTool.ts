/**
 * Tool for retrieving IEEE formatting guide
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GetFormattingGuideInputSchema, GetFormattingGuideInput } from "../schemas/inputSchemas.js";
import { IEEE_FORMATTING_GUIDE } from "../constants.js";
import { ResponseFormat } from "../types.js";

export function registerGuideTool(server: McpServer) {
  server.registerTool(
    "ieee_get_formatting_guide",
    {
      title: "Get IEEE Formatting Guide",
      description: `Retrieve IEEE document formatting standards and guidelines.

This tool provides detailed IEEE formatting specifications for academic papers,
including fonts, margins, spacing, code blocks, and more.

Args:
  - section (string): Specific section to retrieve:
    * "fonts" - Font specifications for all document elements
    * "margins" - Page margin requirements
    * "code_blocks" - Code block formatting and marker usage
    * "spacing" - Line spacing and indentation rules
    * "all" - Complete formatting guide (default)
  - responseFormat ("markdown" | "json"): Output format (default: "markdown")

Returns:
  For markdown format: Formatted guide with headers and examples
  For JSON format:
  {
    "section": string,      // Section name
    "details": string       // Formatting details
  }

Examples:
  - Use when: "What are the IEEE font requirements?"
  - Use when: "How do I format code blocks in IEEE style?"
  - Use when: "Show me all IEEE formatting standards"
  - Use when: "What are the margin requirements for IEEE papers?"

This is a read-only information retrieval tool with no side effects.`,
      inputSchema: GetFormattingGuideInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (params: GetFormattingGuideInput) => {
      try {
        const guideContent = IEEE_FORMATTING_GUIDE[params.section];

        if (params.responseFormat === ResponseFormat.JSON) {
          const output = {
            section: params.section,
            details: guideContent
          };

          return {
            content: [{
              type: "text",
              text: JSON.stringify(output, null, 2)
            }],
            structuredContent: output
          };
        } else {
          // Markdown format
          return {
            content: [{
              type: "text",
              text: guideContent
            }]
          };
        }
      } catch (error: any) {
        return {
          content: [{
            type: "text",
            text: `Error retrieving formatting guide: ${error.message}`
          }]
        };
      }
    }
  );
}
