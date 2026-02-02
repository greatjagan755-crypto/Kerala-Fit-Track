@echo off
echo Installing dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo.
    echo Error installing dependencies! Please ensure Python and pip are installed.
    pause
    exit /b
)

echo.
echo Starting Weather Predictor...
python app.py
pause
