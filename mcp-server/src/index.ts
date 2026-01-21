#!/usr/bin/env node
/**
 * IEEE DOCX MCP Server
 *
 * MCP server for converting Word documents to IEEE publication format.
 * Provides tools for document conversion, validation, and formatting guidance.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { ConverterService } from "./services/converterService.js";
import { registerConvertTool } from "./tools/convertTool.js";
import { registerGuideTool } from "./tools/guideTool.js";
import { registerValidateTool } from "./tools/validateTool.js";

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the Python converter script
const PYTHON_SCRIPT_PATH = resolve(__dirname, "../../word_to_ieee.py");

// Create MCP server instance
const server = new McpServer({
  name: "ieee-docx-mcp-server",
  version: "1.0.0"
});

// Initialize converter service
const converterService = new ConverterService(PYTHON_SCRIPT_PATH);

// Register all tools
registerConvertTool(server, converterService);
registerValidateTool(server, converterService);
registerGuideTool(server);

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
IEEE DOCX MCP Server v1.0.0

A Model Context Protocol server for converting Word documents to IEEE publication format.

USAGE:
  ieee-docx-mcp-server [OPTIONS]

OPTIONS:
  --help, -h     Show this help message
  --version, -v  Show version information

TOOLS PROVIDED:
  ieee_convert_document       - Convert Word documents to IEEE format
  ieee_validate_document      - Validate documents against IEEE standards
  ieee_get_formatting_guide   - Get IEEE formatting specifications

REQUIREMENTS:
  - Node.js 18+
  - Python 3.7+ with python-docx library

EXAMPLES:
  # Run as MCP server (stdio transport)
  ieee-docx-mcp-server

  # In Claude Desktop config:
  {
    "mcpServers": {
      "ieee-docx": {
        "command": "node",
        "args": ["/path/to/ieee-docx-mcp-server/dist/index.js"]
      }
    }
  }

For more information, visit:
https://github.com/your-repo/word-to-ieee-converter
`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log("ieee-docx-mcp-server version 1.0.0");
  process.exit(0);
}

// Main function
async function main() {
  // Check for Python script
  try {
    const { access } = await import("fs/promises");
    await access(PYTHON_SCRIPT_PATH);
  } catch (error) {
    console.error(`ERROR: Python converter script not found at: ${PYTHON_SCRIPT_PATH}`);
    console.error("Please ensure word_to_ieee.py is in the parent directory.");
    process.exit(1);
  }

  // Create stdio transport
  const transport = new StdioServerTransport();

  // Connect server to transport
  await server.connect(transport);

  // Log to stderr (stdout is used for MCP protocol)
  console.error("IEEE DOCX MCP Server running via stdio");
  console.error(`Python converter: ${PYTHON_SCRIPT_PATH}`);
  console.error("Ready to receive requests...");
}

// Run the server
main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
