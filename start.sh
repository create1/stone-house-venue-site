#!/bin/bash

# Stone House Website - Quick Start Script
# This script launches a local web server to view your website

echo "🏛️  Stone House Website - Starting Local Server..."
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Starting server with Python 3..."
    echo "🌐 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Starting server with Python 2..."
    echo "🌐 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found!"
    echo ""
    echo "Options:"
    echo "1. Install Python from https://www.python.org/"
    echo "2. Or simply open index.html in your browser"
    echo ""
    read -p "Press Enter to open index.html in your default browser..."
    open index.html 2>/dev/null || xdg-open index.html 2>/dev/null || start index.html 2>/dev/null
fi
