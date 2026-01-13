# GitHub Setup Instructions

Your project is ready to be published on GitHub! Follow these steps:

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `word-to-ieee-converter`
5. Description: "A Python utility to convert Microsoft Word documents to IEEE standard format"
6. Choose **Public** (so others can use it)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to your project directory
cd C:\Users\anshu\word-to-ieee-converter

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/word-to-ieee-converter.git

# Push your code
git branch -M main
git push -u origin main
```

## Step 3: Verify SSH Connection

If you haven't added your SSH key to GitHub yet:

1. Make sure you've added your SSH key to GitHub (from earlier setup)
2. Test the connection:
   ```bash
   ssh -T git@github.com
   ```
3. You should see: "Hi AnshulKummar! You've successfully authenticated..."

## Step 4: Push Your Code

Once the remote is added and SSH is working:

```bash
git push -u origin main
```

## Step 5: Add Repository Topics (Optional)

After pushing, go to your repository on GitHub and add topics like:
- `ieee`
- `word-document`
- `formatting`
- `academic`
- `python`
- `document-converter`

## Step 6: Create a Release (Optional)

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Description: "First release of the Word to IEEE format converter utility"
6. Click "Publish release"

## Troubleshooting

### If SSH doesn't work:
You can use HTTPS instead:
```bash
git remote add origin https://github.com/YOUR_USERNAME/word-to-ieee-converter.git
git push -u origin main
```

### If you get authentication errors:
- Make sure your SSH key is added to GitHub
- Or use a Personal Access Token with HTTPS

## Your Repository Will Be Available At:
`https://github.com/AnshulKummar/word-to-ieee-converter`
