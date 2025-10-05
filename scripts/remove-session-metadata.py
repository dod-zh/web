#!/usr/bin/env python3
"""
Remove title and description from session markdown files.
The title will be taken from sessions.json instead.
"""

import os
import re
from pathlib import Path

def process_session_file(filepath):
    """Remove title and description from a session markdown file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has frontmatter
    if not content.startswith('---'):
        print(f"Skipping {filepath} - no frontmatter found")
        return False
    
    # Split frontmatter and body
    parts = content.split('---', 2)
    if len(parts) < 3:
        print(f"Skipping {filepath} - invalid frontmatter")
        return False
    
    frontmatter = parts[1]
    body = parts[2]
    
    # Remove title line
    frontmatter = re.sub(r'\ntitle:.*?\n', '\n', frontmatter)
    # Remove description line (may be multi-line with quotes)
    frontmatter = re.sub(r'\ndescription:.*?\n', '\n', frontmatter)
    
    # Reconstruct the file
    new_content = f"---{frontmatter}---{body}"
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ Processed {filepath}")
    return True

def main():
    # Get all session markdown files
    sessions_dir = Path('/workspaces/devopsdays_ch-web/content/sessions')
    
    if not sessions_dir.exists():
        print(f"Error: Sessions directory not found: {sessions_dir}")
        return
    
    # Find all .md files recursively
    session_files = list(sessions_dir.rglob('*.md'))
    
    print(f"Found {len(session_files)} session files")
    print("-" * 60)
    
    processed = 0
    for filepath in session_files:
        if process_session_file(filepath):
            processed += 1
    
    print("-" * 60)
    print(f"Successfully processed {processed} out of {len(session_files)} files")

if __name__ == '__main__':
    main()
