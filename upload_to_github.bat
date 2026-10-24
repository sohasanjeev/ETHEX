@echo off
title ETHEX 2026 - Uploading to GitHub
color 0b
echo ================================================================
echo               ETHEX 2026 - UPLOADING TO GITHUB
echo ================================================================
echo.
cd /d "C:\Users\sanje\.gemini\antigravity\scratch\ethex-2026"
echo [1/2] Connecting to your GitHub repository...
echo [2/2] Pushing all 41 routes, CBT test engine, and branding assets...
echo.
git push --force -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    color 0a
    echo ================================================================
    echo  SUCCESS! All code has been uploaded to your GitHub repository!
    echo  Vercel is now automatically deploying your website.
    echo ================================================================
) else (
    echo.
    echo If GitHub opened a sign-in window in your browser, please approve it.
)
echo.
pause
