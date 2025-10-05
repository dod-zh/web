#!/usr/bin/env python3
"""
Update speakers and sessions content while preserving existing YAML frontmatter.
This script merges data from temp/ folders into content/ folders.
"""

import os
import re
from pathlib import Path

def parse_frontmatter(content):
    """Parse frontmatter from markdown content."""
    # Try YAML frontmatter (---)
    yaml_match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if yaml_match:
        return 'yaml', yaml_match.group(1), yaml_match.group(2)
    
    # Try TOML frontmatter (+++)
    toml_match = re.match(r'^\+\+\+\n(.*?)\n\+\+\+\n(.*)$', content, re.DOTALL)
    if toml_match:
        return 'toml', toml_match.group(1), toml_match.group(2)
    
    return None, '', content

def update_speakers():
    """Update speaker files with content from temp/speakers while preserving meta."""
    temp_dir = Path('/workspaces/devopsdays_ch-web/temp/speakers')
    content_dir = Path('/workspaces/devopsdays_ch-web/content/speakers')
    
    print("Updating speakers...")
    updated = 0
    created = 0
    
    for temp_file in temp_dir.glob('*.md'):
        filename = temp_file.name
        content_file = content_dir / filename
        
        # Read temp file content
        with open(temp_file, 'r', encoding='utf-8') as f:
            temp_content = f.read()
        
        temp_format, temp_meta, temp_body = parse_frontmatter(temp_content)
        
        if content_file.exists():
            # Read existing content file
            with open(content_file, 'r', encoding='utf-8') as f:
                existing_content = f.read()
            
            existing_format, existing_meta, existing_body = parse_frontmatter(existing_content)
            
            if existing_format == 'yaml':
                # Keep existing YAML meta, use temp body
                new_content = f"---\n{existing_meta}\n---\n{temp_body}"
                print(f"  Updated (preserved YAML meta): {filename}")
            else:
                # No existing YAML meta, just update the whole file
                new_content = temp_content
                print(f"  Updated (no existing meta to preserve): {filename}")
            
            updated += 1
        else:
            # New file, just copy
            new_content = temp_content
            print(f"  Created: {filename}")
            created += 1
        
        # Write updated content
        with open(content_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    print(f"Speakers: {updated} updated, {created} created\n")

def update_sessions():
    """Update session files with content from temp/program while preserving meta."""
    temp_dir = Path('/workspaces/devopsdays_ch-web/temp/program')
    sessions_base = Path('/workspaces/devopsdays_ch-web/content/sessions')
    
    print("Updating sessions...")
    updated = 0
    created = 0
    
    for temp_file in temp_dir.glob('*.md'):
        filename = temp_file.name
        
        # Read temp file to determine session type
        with open(temp_file, 'r', encoding='utf-8') as f:
            temp_content = f.read()
        
        temp_format, temp_meta, temp_body = parse_frontmatter(temp_content)
        
        # Determine session type (ignite vs talk vs workshop vs keynote)
        session_type = 'talks'  # default
        if '### Ignite' in temp_body:
            session_type = 'ignites'
        elif '### Workshop' in temp_body:
            session_type = 'workshops'
        elif '### Keynote' in temp_body:
            session_type = 'keynotes'
        
        # Check in all session directories for existing file
        content_file = None
        for subdir in ['ignites', 'talks', 'workshops', 'keynotes']:
            potential_file = sessions_base / subdir / filename
            if potential_file.exists():
                content_file = potential_file
                break
        
        # If not found, use the determined session type directory
        if content_file is None:
            content_file = sessions_base / session_type / filename
        
        if content_file.exists():
            # Read existing content file
            with open(content_file, 'r', encoding='utf-8') as f:
                existing_content = f.read()
            
            existing_format, existing_meta, existing_body = parse_frontmatter(existing_content)
            
            if existing_format == 'yaml':
                # Keep existing YAML meta, use temp body
                new_content = f"---\n{existing_meta}\n---\n{temp_body}"
                print(f"  Updated (preserved YAML meta): {session_type}/{filename}")
            else:
                # No existing YAML meta, just update the whole file
                new_content = temp_content
                print(f"  Updated (no existing meta to preserve): {session_type}/{filename}")
            
            updated += 1
        else:
            # New file, just copy
            new_content = temp_content
            content_file.parent.mkdir(parents=True, exist_ok=True)
            print(f"  Created: {session_type}/{filename}")
            created += 1
        
        # Write updated content
        with open(content_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    print(f"Sessions: {updated} updated, {created} created\n")

if __name__ == '__main__':
    update_speakers()
    update_sessions()
    print("Update complete!")
