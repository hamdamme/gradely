#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
# Homebrew Maven otherwise selects its own newer JDK on macOS.
if [[ -z "${JAVA_HOME:-}" && -d /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home ]]; then
  export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
fi
if [[ -f "$root/.env" ]]; then
  set -a
  source "$root/.env"
  set +a
fi
exec mvn -f "$root/backend/pom.xml" "-Dmaven.repo.local=$root/.data/maven" "$@"
