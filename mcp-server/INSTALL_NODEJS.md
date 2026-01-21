# Installing Node.js

Step-by-step guide to install Node.js on your system.

## Windows Installation

### Method 1: Official Installer (Recommended)

1. **Download Node.js:**
   - Visit https://nodejs.org/
   - Download the LTS version (Long Term Support)
   - Choose the Windows Installer (.msi) for your system (usually 64-bit)

2. **Run the installer:**
   - Double-click the downloaded .msi file
   - Click "Next" through the setup wizard
   - Accept the license agreement
   - Choose installation location (default is fine)
   - **Important:** Ensure "Add to PATH" is checked
   - Click "Install"

3. **Verify installation:**
   Open Command Prompt (cmd) and run:
   ```cmd
   node --version
   npm --version
   ```

   You should see version numbers like:
   ```
   v18.19.0
   10.2.3
   ```

### Method 2: Chocolatey Package Manager

If you have Chocolatey installed:

```cmd
choco install nodejs-lts
```

### Method 3: Winget (Windows 11)

```cmd
winget install OpenJS.NodeJS.LTS
```

## macOS Installation

### Method 1: Official Installer

1. Visit https://nodejs.org/
2. Download the macOS Installer (.pkg)
3. Run the installer
4. Follow the prompts
5. Verify in Terminal:
   ```bash
   node --version
   npm --version
   ```

### Method 2: Homebrew (Recommended)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify
node --version
npm --version
```

### Method 3: NVM (Node Version Manager)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node --version
npm --version
```

## Linux Installation

### Ubuntu/Debian

```bash
# Update package index
sudo apt update

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Fedora/RHEL/CentOS

```bash
# Install Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs

# Verify
node --version
npm --version
```

### Using NVM (Recommended for Linux)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.bashrc

# Install Node.js
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node --version
npm --version
```

## Troubleshooting

### "node: command not found" after installation

**Windows:**
1. Restart Command Prompt or PowerShell
2. If still not found, add Node.js to PATH manually:
   - Search "Environment Variables" in Start Menu
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click "Edit"
   - Add: `C:\Program Files\nodejs\`
   - Click OK and restart terminal

**macOS/Linux:**
1. Restart terminal
2. If using nvm, run: `source ~/.bashrc` or `source ~/.zshrc`
3. Check if Node.js is installed: `ls /usr/local/bin/node`

### Permission errors when installing packages

**Windows:**
Run Command Prompt as Administrator

**macOS/Linux:**
Don't use `sudo npm install`. Instead:
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### npm install fails with EACCES

```bash
# Linux/macOS
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Wrong Node.js version installed

```bash
# Check current version
node --version

# Using nvm to switch versions
nvm install 18
nvm use 18
nvm alias default 18
```

## Verifying Successful Installation

Run these commands:

```bash
# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version (should be 9.x or higher)
npm --version

# Test Node.js works
node -e "console.log('Node.js is working!')"

# Test npm works
npm --help
```

Expected output:
```
v18.19.0
10.2.3
Node.js is working!
[npm help text...]
```

## Next Steps

After Node.js is installed:

1. **Navigate to the MCP server directory:**
   ```bash
   cd "path/to/word-to-ieee-converter/mcp-server"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Test it works:**
   ```bash
   node dist/index.js --help
   ```

If you see the help message, you're ready to continue with [QUICKSTART.md](QUICKSTART.md)!

## Additional Resources

- **Node.js Official Site:** https://nodejs.org/
- **npm Documentation:** https://docs.npmjs.com/
- **nvm (Node Version Manager):** https://github.com/nvm-sh/nvm
- **Node.js Tutorial:** https://nodejs.dev/learn

## Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Search for the error message online
3. Visit Node.js community forums
4. Check Stack Overflow for common issues

## Why Node.js 18+?

The MCP server requires Node.js 18 or higher because:
- Modern ES modules support
- Improved performance
- Better async/await handling
- Required by MCP SDK dependencies
- Long-term support (LTS) version

## Uninstalling Node.js

### Windows
- Use "Add or Remove Programs" in Windows Settings
- Or uninstall via Control Panel

### macOS with Homebrew
```bash
brew uninstall node
```

### Linux
```bash
sudo apt remove nodejs npm  # Ubuntu/Debian
sudo dnf remove nodejs      # Fedora/RHEL
```

### With nvm
```bash
nvm uninstall 18
```
