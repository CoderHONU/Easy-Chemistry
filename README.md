# Easy Chemistry by S.P. Sir

This repository contains a modern landing page for Easy Chemistry by S.P. Sir. It supports both:
- a static deployment from `index.html` for GitHub Pages or any static host
- a Flask backend in `app.py` for Python hosting platforms

## What changed
- Added root `index.html` so the site can be served as a static website
- Updated the contact form to open WhatsApp instead of requiring a backend API call
- Added deployment support files: `requirements.txt`, `Procfile`, `runtime.txt`, and `.gitignore`

## Deploy to GitHub Pages
1. Initialize git and commit the project:
   ```bash
   git init
   git add .
   git commit -m "Prepare site for deployment"
   ```
2. Create a GitHub repository and add it as a remote:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub repository settings, enable GitHub Pages from the `main` branch and root folder.
4. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

## Optional: Deploy the Flask app to Render / Railway / Heroku
If you want the full Python backend later, deploy using the `app.py` Flask server.
- `requirements.txt` lists needed Python packages
- `Procfile` is configured for Gunicorn
- `runtime.txt` selects Python 3.11

## Deploy via GitHub API script
A helper script is included to create the repository and publish the project to GitHub Pages automatically.

Run:
```bash
python deploy_to_github.py
```

The script will ask for:
- GitHub username
- repository name
- GitHub Personal Access Token with `repo` permissions

## Local preview
To run locally with Flask:
```bash
pip install -r requirements.txt
python app.py
```
Then open http://127.0.0.1:5000

## Notes
- The website is now deployable as a static site even without a Python server.
- If you want, I can also connect this repo to GitHub and finish the push step for you.
