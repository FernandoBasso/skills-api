#!/usr/bin/env bash

##
# Creates a kitty session with a few appropriately named
# tabs and windows.
#
# NOTE: Run this script from INSIDE kitty from the directory
# where this file is located.
#
# USAGE:
#
#   $ cd /path/to/this/skills-api-directory
#   $ bash ./kitty-session.bash
##

if [[ "$TERM" != xterm-kitty ]] ; then
	cat 1>&2 <<-'EOF'

!! NOTE !!

This script can only be used from Kitty terminal emulator.'

Bailing out...
	EOF

	exit 1
fi

win_title='λ SKILLS-API λ'
work_dir="$PWD"

kitty @ launch \
  --type=tab \
  --cwd "$work_dir" \
  --tab-title vim \
  --title "$win_title"

kitty @ launch \
  --type=tab \
  --cwd "$work_dir" \
  --tab-title server \
  --title "$win_title"

kitty @ launch \
	--type=tab \
	--cwd "$work_dir" \
	--tab-title shell \
	--title "$win_title"

kitty @ launch \
	--type=tab \
	--cwd "$work_dir" \
	--tab-title shell \
	--title "$win_title"

kitty @ focus-tab -m title:shell
kitty @ send-text -m num:1 'git status\n'

##
# Close the initial that is used to launch the script.
#
kitty @ close-tab -m index:0

#
# vim: set tw=72:
#
