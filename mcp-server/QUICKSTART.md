# Quick Start Guide

Get the IEEE DOCX MCP Server running in 5 minutes.

## Prerequisites Check

```bash
# Check Node.js (need 18+)
node --version

# Check Python (need 3.7+)
python --version

# Check python-docx
python -c "import docx; print('python-docx OK')"
```

If any fail, see [SETUP.md](SETUP.md) for installation instructions.

## Install and Build

```bash
# Navigate to mcp-server directory
cd "C:\Users\anshu\OneDrive\Desktop\Claude Code Projects\IEEE Utility\word-to-ieee-converter\mcp-server"

# Install dependencies
npm install

# Build
npm run build

# Test
node dist/index.js --help
```

## Configure Claude Desktop

1. **Find config file:**
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Add this configuration:**

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

**Note:** Adjust the path if your project is elsewhere. Use forward slashes `/`.

3. **Restart Claude Desktop**

## Test It

Ask Claude:

```
What are the IEEE formatting standards for fonts?
```

Claude should use the `ieee_get_formatting_guide` tool and show you the font specifications.

## Convert a Document

1. **Prepare your Word document:**
   - Add `<code block start>` before code sections
   - Add `<code block end>` after code sections
   - Save as .docx

2. **Ask Claude:**
   ```
   I have a research paper that needs IEEE formatting. The document has:
   - A title and authors
   - An abstract
   - Several sections with Roman numeral headings
   - Code blocks marked with the proper markers

   Can you help me convert it to IEEE format?
   ```

3. **Claude will:**
   - Use the `ieee_convert_document` tool
   - Process your document
   - Return the IEEE-formatted version

## Available Tools

### 1. ieee_convert_document
Convert Word documents to IEEE format.

**Example use:**
- "Convert this document to IEEE format"
- "Apply IEEE two-column layout to my paper"

### 2. ieee_get_formatting_guide
Get IEEE formatting specifications.

**Example use:**
- "What are the IEEE margin requirements?"
- "Show me how to format code blocks"
- "What fonts does IEEE require?"

### 3. ieee_validate_document
Validate documents (feature in development).

**Example use:**
- "Check if my document meets IEEE standards"

## Common Issues

### "npm: command not found"
Install Node.js from https://nodejs.org/

### "Python converter script not found"
Ensure `word_to_ieee.py` is in the parent directory.

### Claude doesn't see the server
1. Check config file path
2. Verify build: `node dist/index.js --help`
3. Restart Claude Desktop completely

## Next Steps

- Read [README.md](README.md) for full documentation
- See [SETUP.md](SETUP.md) for detailed setup instructions
- Check [MARKETPLACE.md](MARKETPLACE.md) if you want to publish

## Testing Without Claude

Use MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

This opens a web interface to test tools directly.

## Getting Help

- Check documentation in this directory
- Review error messages carefully
- Ensure all prerequisites are installed
- Try MCP Inspector for debugging

## Success!

If Claude can call the tools and show formatting guides, you're all set!

Start converting your research papers to IEEE format. 🎓
