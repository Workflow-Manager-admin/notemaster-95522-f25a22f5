#!/bin/bash
cd /home/kavia/workspace/code-generation/notemaster-95522-f25a22f5/notes_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

