#!/bin/bash
# Deploy AUREL static export to GitHub Pages (gh-pages branch)
# Usage: bash scripts/deploy-gh-pages.sh
set -euo pipefail

cd "$(dirname "$0")/.."
REPO_URL=$(git remote get-url origin)
OUT_DIR="out"
GH_PAGES_BRANCH="gh-pages"
TMP_BRANCH="gh-pages-deploy-$(date +%s)"

echo "==> Building static export..."
STATIC_EXPORT=true \
NEXT_PUBLIC_BASE_PATH=/aurel-commerce \
NEXT_PUBLIC_SITE_URL=https://hello-aditya-dev.github.io/aurel-commerce \
bun x next build 2>&1 | tail -20 || { echo "Build failed"; exit 1; }

if [ ! -d "$OUT_DIR" ]; then
  echo "==> out/ not found. Build may have failed."
  exit 1
fi

echo "==> Adding .nojekyll to disable Jekyll processing on GitHub Pages"
touch "$OUT_DIR/.nojekyll"

echo "==> Creating deploy commit on orphan branch $TMP_BRANCH"
git worktree add --detach "/tmp/$TMP_BRANCH" 2>/dev/null || true
cd "/tmp/$TMP_BRANCH"
git checkout --orphan "$TMP_BRANCH"
git rm -rf . 2>/dev/null || true

# Copy build output
cp -r "$OLDPWD/$OUT_DIR"/. .

git add -A
git commit -m "deploy: AUREL GitHub Pages build $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$REPO_URL" "$TMP_BRANCH:$GH_PAGES_BRANCH"

cd "$OLDPWD"
git worktree remove --force "/tmp/$TMP_BRANCH" 2>/dev/null || true
git branch -D "$TMP_BRANCH" 2>/dev/null || true

echo ""
echo "==> Deployed to GitHub Pages."
echo "==> URL: https://hello-aditya-dev.github.io/aurel-commerce/"
echo "==> (May take 1-2 minutes for GitHub to publish the first time.)"
