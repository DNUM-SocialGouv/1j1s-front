#!/bin/bash
if [[ -z $NODE_ENV ]];then

    cp ./hooks/* .git/hooks/

    chmod +x .git/hooks/commit-msg;
    chmod +x .git/hooks/pre-commit;
    exit 0;
fi
