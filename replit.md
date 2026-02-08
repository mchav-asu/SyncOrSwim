# Project Template

## Overview
A collection of web pages for a company project template, originally built as an ASP.NET Web Forms (.NET Framework 4.8) application. The static frontend pages are served via a Node.js/Express server in the Replit environment.

## Project Architecture
- **Server**: `server.js` - Express static file server on port 5000
- **Login & Dashboard**: `Login & Dashboard/` - Admin login page and survey question dashboard
- **Project Services**: `ProjectTemplate/` - Original ASP.NET project files including static HTML pages
- **Homepage**: Served inline from `server.js`, provides navigation to all pages

### Pages
- `/` - Homepage with navigation links
- `/login/login.html` - Admin login (credentials: admin / 1234)
- `/login/dashboard.html` - Survey question management dashboard
- `/project/index.html` - Project services test page
- `/project/company-happenings.html` - Company happenings quiz/survey

## Tech Stack
- Node.js 20 with Express 5
- Static HTML/CSS/JavaScript frontend

## Recent Changes
- 2026-02-08: Set up Node.js/Express server to serve static files in Replit environment
