# IEEE DOCX MCP Server

A Model Context Protocol (MCP) server that enables Claude and other LLM applications to convert Word documents to IEEE publication format.

## Features

- **Document Conversion**: Automatically apply IEEE formatting standards to Word documents
- **Formatting Guide**: Retrieve detailed IEEE formatting specifications
- **Validation**: Check documents against IEEE standards (coming soon)
- **Code Block Support**: Proper formatting of code blocks with markers
- **Two-Column Layout**: Optional IEEE two-column format

## Tools Provided

### 1. `ieee_convert_document`
Convert Word documents to IEEE publication format with proper fonts, margins, spacing, and code block formatting.

**Parameters:**
- `documentBase64` (string): Base64-encoded Word document
- `twoColumn` (boolean): Enable two-column layout (default: false)
- `outputFilename` (string): Output filename (default: "ieee_formatted.docx")

**Returns:**
```json
{
  "success": true,
  "message": "Document successfully converted to IEEE format",
  "outputBase64": "base64-encoded-document..."
}
```

### 2. `ieee_get_formatting_guide`
Retrieve IEEE formatting standards and guidelines.

**Parameters:**
- `section` (string): "fonts", "margins", "code_blocks", "spacing", or "all"
- `responseFormat` (string): "markdown" or "json"

**Returns:** Detailed IEEE formatting specifications

### 3. `ieee_validate_document`
Validate documents against IEEE standards (placeholder feature).

**Parameters:**
- `documentBase64` (string): Base64-encoded Word document
- `responseFormat` (string): "markdown" or "json"

## Installation

### Prerequisites

1. **Node.js 18+**
   ```bash
   # Download from https://nodejs.org/
   # Or use nvm:
   nvm install 18
   nvm use 18
   ```

2. **Python 3.7+** with `python-docx`
   ```bash
   pip install python-docx
   ```

### Setup

1. Clone or navigate to the repository:
   ```bash
   cd word-to-ieee-converter/mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript project:
   ```bash
   npm run build
   ```

4. Verify installation:
   ```bash
   npm test
   # or
   node dist/index.js --help
   ```

## Usage

### With Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "ieee-docx": {
      "command": "node",
      "args": [
        "C:/Users/anshu/OneDrive/Desktop/Claude Code Projects/IEEE Utility/word-to-ieee-converter/mcp-server/dist/index.js"
      ]
    }
  }
}
```

### With MCP Inspector (Testing)

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

### Programmatic Usage

```typescript
import { McpClient } from "@modelcontextprotocol/sdk/client/index.js";

// Connect to the server
const client = new McpClient(/* transport config */);

// Convert a document
const result = await client.callTool("ieee_convert_document", {
  documentBase64: "...",
  twoColumn: false
});
```

## IEEE Formatting Standards

The converter applies the following IEEE standards:

### Margins
- Top: 0.75 inches
- Bottom: 1.0 inches
- Left/Right: 0.625 inches

### Fonts
- **Title**: Times New Roman, 24pt, Bold
- **Body**: Times New Roman, 10pt
- **Code**: Courier New, 9pt
- **Captions**: Times New Roman, 9pt

### Code Blocks
To format code blocks, use markers in your Word document:

```
Here is a Python example:

<code block start>
def example():
    print("Hello, IEEE!")
<code block end>

Code Block 1: Python Example
```

The converter will:
- Remove the markers
- Format code with Courier New 9pt
- Add bordered box with gray background
- Preserve indentation and line breaks

### Spacing
- Single line spacing (1.0) throughout
- Proper paragraph indentation
- Appropriate spacing around headings

## Development

### Project Structure

```
mcp-server/
├── src/
│   ├── index.ts              # Main entry point
│   ├── types.ts              # TypeScript interfaces
│   ├── constants.ts          # IEEE formatting constants
│   ├── tools/                # Tool implementations
│   │   ├── convertTool.ts
│   │   ├── guideTool.ts
│   │   └── validateTool.ts
│   ├── services/             # Business logic
│   │   └── converterService.ts
│   └── schemas/              # Zod validation schemas
│       └── inputSchemas.ts
├── dist/                     # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm start` - Run the compiled server
- `npm test` - Test the build
- `npm run clean` - Remove dist directory

### Adding New Tools

1. Create tool file in `src/tools/`
2. Define Zod schema in `src/schemas/inputSchemas.ts`
3. Register tool in `src/index.ts`
4. Build and test

## Architecture

The MCP server acts as a bridge between LLM applications and the Python converter:

```
┌─────────────┐
│   Claude    │
│  (or other  │
│  LLM app)   │
└──────┬──────┘
       │ MCP Protocol (stdio)
       │
┌──────▼──────┐
│  TypeScript │
│ MCP Server  │
│   (Node.js) │
└──────┬──────┘
       │ Execute Python
       │
┌──────▼──────┐
│  word_to_   │
│   ieee.py   │
│  (Python)   │
└─────────────┘
```

## Troubleshooting

### "Python converter script not found"
Ensure `word_to_ieee.py` is in the parent directory:
```bash
ls ../word_to_ieee.py
```

### "npm: command not found"
Install Node.js from https://nodejs.org/

### "python-docx not found"
Install the Python library:
```bash
pip install python-docx
```

### MCP Inspector connection issues
Ensure the server builds successfully:
```bash
npm run build
node dist/index.js --help
```

## Publishing to Claude Marketplace

### Prerequisites
1. Build and test the server thoroughly
2. Create evaluation questions (see `EVALUATION.md`)
3. Prepare submission documentation

### Submission Checklist
- [ ] All tools tested with MCP Inspector
- [ ] README with clear usage instructions
- [ ] 10 evaluation questions created
- [ ] License file (MIT recommended)
- [ ] Version tagged in git
- [ ] Dependencies specified in package.json
- [ ] Built artifacts in dist/ directory

## Version History

### v1.0.0 (2026-01-20)
- Initial release
- Document conversion to IEEE format
- Formatting guide tool
- Code block marker support
- Two-column layout option

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues or questions:
- GitHub Issues: [link to repo issues]
- Documentation: [link to docs]
- MCP Protocol: https://modelcontextprotocol.io/

## Acknowledgments

- Built with the Model Context Protocol (MCP) SDK
- Python converter based on python-docx library
- IEEE formatting standards from IEEE publication guidelines
