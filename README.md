mkdir -p apps/backend
cd apps/backend
npm init -y
npm pkg delete main           # not needed yet
npm pkg set "type" "module"
cd ../../

# root lint script until real packages exist
npm pkg set scripts.lint "eslint . --ext .js,.ts || true"
npm pkg set scripts.test "echo \"(no tests yet)\""

git add apps/backend package.json
git commit -m "chore: add placeholder backend workspace and root lint script"
//tmp
