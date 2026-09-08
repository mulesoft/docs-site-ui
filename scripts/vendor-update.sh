#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${INIT_CWD:-}" ]]; then
  INIT_CWD="$PWD"
fi

pack_packages() {
  npm pack @mulesoft/lume-icon --registry=https://nexus3.build.msap.io/repository/npm-internal/ >/dev/null
  npm pack @mulesoft/lume-styling-hooks --registry=https://nexus3.build.msap.io/repository/npm-internal/ >/dev/null
}

login_to_registry() {
  echo "The npm registry returned 401 Unauthorized."
  echo "Please sign in with your MSAP credentials first."

  local username password email
  read -r -p "MSAP username: " username
  read -r -s -p "MSAP password: " password
  echo
  read -r -p "MSAP email: " email
  echo

  if [[ -z "$username" || -z "$password" || -z "$email" ]]; then
    echo "Username, password, and email are required." >&2
    return 1
  fi

  npm login --registry=https://nexus3.build.msap.io/repository/npm-internal/ --scope=@mulesoft --auth-type=legacy <<EOF
$username
$password
$email
EOF
}

tmpdir=$(mktemp -d)
cd "$tmpdir"

if ! pack_packages; then
  if ! login_to_registry; then
    echo "Unable to sign in to the MSAP registry." >&2
    exit 1
  fi

  if ! pack_packages; then
    echo "npm pack still failed after login. Please check your MSAP credentials." >&2
    exit 1
  fi
fi

find "$INIT_CWD/vendor" -maxdepth 1 -type f \( -name 'mulesoft-lume-icon-*.tgz' -o -name 'mulesoft-lume-styling-hooks-*.tgz' \) -delete

for f in *.tgz; do
  if [[ "$f" == *lume-icon* ]]; then
    mv "$f" "$INIT_CWD/vendor/mulesoft-lume-icon-${f#*lume-icon-}"
  elif [[ "$f" == *lume-styling-hooks* ]]; then
    mv "$f" "$INIT_CWD/vendor/mulesoft-lume-styling-hooks-${f#*lume-styling-hooks-}"
  fi
done

node -e "const fs=require('fs'); const path=require('path'); const pkgPath=path.join(process.env.INIT_CWD,'package.json'); const pkg=JSON.parse(fs.readFileSync(pkgPath,'utf8')); const vendorDir=path.join(process.env.INIT_CWD,'vendor'); const latest=(prefix)=>{ const files=fs.readdirSync(vendorDir).filter((f)=>new RegExp('^'+prefix+'-.*\\.tgz$').test(f)).sort(); return files.length ? files[files.length - 1].replace(new RegExp('^'+prefix+'-'), '').replace(/\\.tgz$/, '') : ''; }; pkg.devDependencies['@mulesoft/lume-icon'] = 'file:vendor/mulesoft-lume-icon-' + latest('mulesoft-lume-icon') + '.tgz'; pkg.devDependencies['@mulesoft/lume-styling-hooks'] = 'file:vendor/mulesoft-lume-styling-hooks-' + latest('mulesoft-lume-styling-hooks') + '.tgz'; fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');"

ls -1 "$INIT_CWD/vendor"
