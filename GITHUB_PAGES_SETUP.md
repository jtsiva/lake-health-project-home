# GitHub Pages Setup Guide for Lake Health Project

## 🎯 Quick Start

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Build and deployment**, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `docs` folder
4. Click **Save**

### 2. Your Site Will Be Live At:
```
https://[your-username].github.io/lake-health-project-home/
```

## 📋 Detailed Setup Instructions

## 🔧 Repository Structure

```
lake-health-project-home/
├── .gitignore                  # Updated to handle docs/
├── website-manager.bat         # Deployment tool
├── docs/                       # Website files (development and deployment)
├── raw/                        # Original files (16 files)
└── [documentation files]      # CHANGELOG, specs, etc.
```

## 🚀 Deployment Workflow

### Using the Website Manager Tool

The `website-manager.bat` tool provides a complete workflow:

#### Test Locally
```bash
website-manager test
```
- Starts Python HTTP server on port 8080
- Open browser to: http://localhost:8080/
- Press Ctrl+C to stop

#### Check Content
```bash
website-manager sync
```
- Verifies `docs/` directory exists
- Shows directory statistics

#### Deploy to GitHub
```bash
website-manager deploy
```
- Adds `docs/` to git
- Commits with message "Update deployed website content"
- Pushes to GitHub main branch
- Automatically triggers GitHub Pages update

#### Full Cycle (Test → Deploy)
```bash
website-manager full
```
- Tests website locally
- Verifies content
- Asks for confirmation
- Deploys to GitHub

## 📖 Command Reference

| Command | Description | Usage |
|---------|-------------|-------|
| `test` | Start local test server | `website-manager test` |
| `sync` | Sync dev → deploy | `website-manager sync` |
| `deploy` | Deploy to GitHub | `website-manager deploy` |
| `deploy "msg"` | Deploy with custom message | `website-manager deploy "Added new content"` |
| `full` | Test, sync, deploy | `website-manager full` |
| `help` | Show help | `website-manager help` |

## 🔄 Content Management Strategy

### How It Works
1. **Development**: Edit files directly in `docs/`
2. **Testing**: Test locally using `website-manager test`
3. **Deploy**: Push to GitHub using `website-manager deploy`
4. **Live**: GitHub Pages automatically updates

### Keeping Content Updated
- **Edit files directly** in `docs/` (development and deployment)
- **Test locally** using `website-manager test`
- **Deploy frequently** using `website-manager deploy`
- **No sync needed** - work directly in `docs/`

### File Structure
```
docs/
├── index.html
├── about/
│   └── index.html
├── learn/
│   ├── index.html
│   ├── equipment/
│   │   ├── *.html
│   ├── testing/
│   │   ├── *.html
│   └── observations/
│       ├── *.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── 404.html
```

## 🛠️ Troubleshooting

### Common Issues

#### GitHub Pages Not Updating
1. **Check Settings**: Ensure Pages is set to `main` branch `/docs` folder
2. **Check Commits**: Verify latest commit includes `docs/` changes
3. **Wait**: GitHub Pages can take 1-2 minutes to update
4. **Clear Cache**: Hard refresh browser (Ctrl+F5)

#### Local Testing Not Working
1. **Python Required**: Ensure Python is installed
2. **Port Conflict**: Try different port: edit `website-manager.bat` line 10
3. **Firewall**: Allow port 8080 in firewall settings

#### Common Issues
1. **Directory Missing**: Run `mkdir docs` if needed
2. **Permission Issues**: Run command prompt as administrator
3. **Files Not Found**: Check `docs/` directory exists

## 🎨 Customization

### Change Deployment Settings
Edit `website-manager.bat` lines 7-10:
```batch
SET "SOURCE_DIR=docs"
SET "DEPLOY_DIR=docs"
SET "TEST_PORT=8080"
SET "GIT_BRANCH=main"
```

### Change GitHub Pages Branch
1. Go to repo Settings → Pages
2. Change branch selection
3. Update `GIT_BRANCH` in `website-manager.bat`

## 📊 Deployment Checklist

- [ ] ✅ Repository has `docs/` folder with website content
- [ ] ✅ GitHub Pages enabled (Settings → Pages)
- [ ] ✅ Source set to `main` branch `/docs` folder
- [ ] ✅ First deployment committed and pushed
- [ ] ✅ Site accessible at GitHub Pages URL
- [ ] ✅ Tested local development workflow
- [ ] ✅ Custom domain configured (optional)

## 🔗 Useful Links

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Custom Domains**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **Troubleshooting**: https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors

## 🎉 Success!

Your Lake Health Project website is now:
- ✅ **Deployed**: Live on GitHub Pages
- ✅ **Maintainable**: Easy sync/deploy workflow
- ✅ **Testable**: Local testing available
- ✅ **Documented**: Complete setup guide

**Next Steps:**
1. Test your live site
2. Share the URL with your team
3. Update content as needed using the workflow
4. Consider adding a custom domain