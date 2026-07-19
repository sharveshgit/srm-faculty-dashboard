# GitHub Repository Link

Add your GitHub repository link here:

- Repository: https://github.com/your-username/your-repo-name

## How to add it
1. Open the GitHub repository you created.
2. Copy the repository URL.
3. Replace the placeholder above with your actual link.
4. Save this file.

## Procedure to connect this project to GitHub
1. Open Git Bash or Terminal in this project folder.
2. Run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```
3. If you already initialized Git, skip the first command.
4. After pushing, your project will appear in GitHub.
