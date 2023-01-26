#!/bin/bash
if [[ -z $NODE_ENV ]];then

    cp ./hooks/* .git/hooks/

    chmod +x .git/hooks/post-merge;
    chmod +x .git/hooks/post-rewrite;
    chmod +x .git/hooks/post-checkout;
    chmod +x .git/hooks/commit-msg;
    exit 0;
fi
