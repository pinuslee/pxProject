#bin/bash

git pull origin master

if [ ! -z "$1" ] && [ "$1"="-c" ]
then
	git clean -d -x -f
fi
