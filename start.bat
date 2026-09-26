@echo off
title OIL SIF-PREDICT Platform
cd /d "%~dp0"
echo ===================================================
echo   Starting OIL SIF-PREDICT Platform...
echo ===================================================
echo.
echo Opening browser to http://localhost:8000 ...
start http://localhost:8000
echo.
python run.py
pause
