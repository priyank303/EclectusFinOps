#!/bin/bash
set -e

ACTION="${1:-push}"

if [ "$ACTION" = "pull" ]; then
  echo "Pulling latest changes from GitHub..."
  git pull origin main
  echo "Workspace updated."
elif [ "$ACTION" = "push" ]; then
  MSG="${2:-Daily update $(date '+%Y-%m-%d %H:%M')}"
  git add .
  if git diff --staged --quiet; then
    echo "No changes to commit."
  else
    git commit -m "$MSG"
  fi
  echo "Pushing to GitHub..."
  git push origin main
  echo "Done! Safe to switch laptops."
else
  echo "Usage: ./sync.sh [push|pull] [optional commit message]"
fi
