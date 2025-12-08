---
description: Link the current project to GitHub repository
---

This workflow guides you through initializing a git repository and pushing your code to GitHub.

1. Initialize Git repository
   ```powershell
   git init
   ```
   // turbo

2. Add all files to staging
   ```powershell
   git add .
   ```
   // turbo

3. Commit the changes
   ```powershell
   git commit -m "Initial commit"
   ```
   // turbo

4. Add the GitHub repository as a remote
   ```powershell
   git remote add origin https://github.com/limjeahun/chess-game.git
   ```
   // turbo

5. Verify the remote URL (Optional)
   ```powershell
   git remote -v
   ```
   // turbo

6. Push the code to the main branch
   ```powershell
   git branch -M main
   git push -u origin main
   ```
