## IEEE DOCX MCP Server - Setup Guide

Complete step-by-step instructions for setting up the IEEE DOCX MCP server.

## Step 1: Install Prerequisites

### Install Node.js

**Windows:**
1. Download Node.js 18+ from https://nodejs.org/
2. Run the installer
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

**macOS/Linux:**
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Verify
node --version
npm --version
```

### Install Python Dependencies

Ensure Python 3.7+ is installed with `python-docx`:

```bash
# Check Python version
python --version  # or python3 --version

# Install python-docx
pip install python-docx  # or pip3 install python-docx
```

## Step 2: Build the MCP Server

Navigate to the mcp-server directory:

```bash
cd "C:\Users\anshu\OneDrive\Desktop\Claude Code Projects\IEEE Utility\word-to-ieee-converter\mcp-server"
```

Install dependencies:

```bash
npm install
```

Build the TypeScript project:

```bash
npm run build
```

Expected output:
```
> ieee-docx-mcp-server@1.0.0 build
> tsc

# TypeScript compilation successful - dist/ directory created
```

Verify the build:

```bash
npm test
# or
node dist/index.js --help
```

You should see:
```
IEEE DOCX MCP Server v1.0.0

A Model Context Protocol server for converting Word documents to IEEE publication format.
...
```

## Step 3: Configure Claude Desktop

### Locate Configuration File

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### Add MCP Server Configuration

Edit `claude_desktop_config.json` and add:

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

**Important:**
- Use forward slashes `/` even on Windows
- Use the full absolute path to `dist/index.js`
- Adjust the path if your project is in a different location

### Example Multi-Server Configuration

If you have other MCP servers:

```json
{
  "mcpServers": {
    "ieee-docx": {
      "command": "node",
      "args": [
        "C:/Users/anshu/OneDrive/Desktop/Claude Code Projects/IEEE Utility/word-to-ieee-converter/mcp-server/dist/index.js"
      ]
    },
    "other-server": {
      "command": "node",
      "args": ["/path/to/other/server/index.js"]
    }
  }
}
```

## Step 4: Restart Claude Desktop

1. Completely quit Claude Desktop (not just close the window)
2. Restart Claude Desktop
3. The MCP server should automatically start

### Verify Connection

In Claude Desktop, try using one of the tools:

```
Can you show me the IEEE formatting guide for fonts?
```

Claude should be able to call the `ieee_get_formatting_guide` tool.

## Step 5: Test with MCP Inspector (Optional)

The MCP Inspector is a tool for testing MCP servers during development:

```bash
# Install MCP Inspector globally
npm install -g @modelcontextprotocol/inspector

# Run the inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

This opens a web interface where you can:
- View available tools
- Test tool calls
- Inspect requests/responses
- Debug issues

## Troubleshooting

### Issue: "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Cannot find module '@modelcontextprotocol/sdk'"

**Solution:** Run `npm install` in the mcp-server directory

### Issue: "Python converter script not found"

**Solution:** Ensure `word_to_ieee.py` is in the parent directory:
```bash
# From mcp-server directory
ls ../word_to_ieee.py
```

The file structure should be:
```
word-to-ieee-converter/
├── word_to_ieee.py          # Python converter
├── mcp-server/
│   ├── dist/
│   │   └── index.js         # Built MCP server
│   └── src/
```

### Issue: "python-docx not found"

**Solution:** Install the Python library:
```bash
pip install python-docx
```

### Issue: TypeScript compilation errors

**Solution:** Ensure you have TypeScript 5.7+:
```bash
npm install -D typescript@latest
npm run build
```

### Issue: Claude Desktop doesn't see the server

**Solutions:**
1. Check configuration file path is correct
2. Use absolute path with forward slashes
3. Verify build completed successfully: `node dist/index.js --help`
4. Check Claude Desktop logs (Help → View Logs)
5. Restart Claude Desktop completely

### Issue: "Conversion failed: python not found"

**Solution:** Ensure Python is in your PATH:
```bash
# Windows
where python

# macOS/Linux
which python3
```

If not found, add Python to PATH or update the converter service to use the full Python path.

## Development Workflow

### Making Changes

1. Edit TypeScript files in `src/`
2. Rebuild: `npm run build`
3. Test: `node dist/index.js --help`
4. Restart Claude Desktop to pick up changes

### Watch Mode

For rapid development:

```bash
npm run dev
```

This rebuilds automatically when you save files.

### Testing Without Claude

Use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## Next Steps

1. **Try the tools in Claude Desktop:**
   - Ask Claude to show formatting guidelines
   - Convert a test document
   - Experiment with different options

2. **Read the documentation:**
   - Tool descriptions in README.md
   - IEEE formatting standards in constants.ts
   - Code examples in the tools/ directory

3. **Customize if needed:**
   - Modify IEEE standards in src/constants.ts
   - Add new tools in src/tools/
   - Adjust validation logic

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review the README.md
3. Check MCP protocol docs: https://modelcontextprotocol.io/
4. Open an issue on GitHub

## Uninstalling

To remove the MCP server:

1. Remove from Claude Desktop configuration:
   - Delete the "ieee-docx" entry from claude_desktop_config.json

2. Delete the mcp-server directory:
   ```bash
   rm -rf mcp-server/
   ```

3. Restart Claude Desktop
