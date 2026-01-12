#!/bin/bash

# Script to generate a clean directory tree for architecture documentation
# Excludes common directories that shouldn't be included in documentation

set -e

# Default output file
OUTPUT_FILE="${1:-project-structure.txt}"

# Function to generate tree with exclusions
generate_tree() {
    # Check if tree command is available
    if command -v tree &> /dev/null; then
        echo "Using tree command..."
        tree -I 'node_modules|.git|dist|build|coverage|.next|.nuxt|.cache|.svelte-kit|*.log|env|.env*' --dirsfirst -a > "$OUTPUT_FILE"
    else
        echo "Tree command not found. Using find command alternative..."
        # Alternative using find
        find . -type d -not -path './node_modules*' \
                      -not -path './.git*' \
                      -not -path './dist*' \
                      -not -path './build*' \
                      -not -path './coverage*' \
                      -not -path './.next*' \
                      -not -path './.nuxt*' \
                      -not -path './.cache*' \
                      -not -path './.svelte-kit*' \
                      -not -path './env*' \
                      -not -path './.env*' \
                      | sort > "$OUTPUT_FILE"
    fi

    echo "Directory structure saved to $OUTPUT_FILE"
}

# Function to generate simple markdown representation
generate_markdown_tree() {
    echo "## Directory Structure" > "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo '```' >> "$OUTPUT_FILE"

    if command -v tree &> /dev/null; then
        tree -I 'node_modules|.git|dist|build|coverage|.next|.nuxt|.cache|.svelte-kit|*.log|env|.env*' --dirsfirst -a >> "$OUTPUT_FILE"
    else
        # Simple indented representation
        find . -type d -not -path './node_modules*' \
                      -not -path './.git*' \
                      -not -path './dist*' \
                      -not -path './build*' \
                      -not -path './coverage*' \
                      -not -path './.next*' \
                      -not -path './.nuxt*' \
                      -not -path './.cache*' \
                      -not -path './.svelte-kit*' \
                      -not -path './env*' \
                      -not -path './.env*' \
                      | sort | sed 's|/[^/]*$|/|' | sort | uniq | while read dir; do
            depth=$(echo "$dir" | grep -o '/' | wc -l)
            indent=$(printf "%${depth}s" "")
            basename=$(basename "$dir")
            if [ "$basename" = "." ]; then
                echo "./" >> "$OUTPUT_FILE"
            else
                echo "${indent}├── $basename/" >> "$OUTPUT_FILE"
            fi
        done
    fi

    echo '```' >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Markdown directory structure saved to $OUTPUT_FILE"
}

# Function to analyze package.json
analyze_package_json() {
    if [ -f "package.json" ]; then
        echo "" >> "$OUTPUT_FILE"
        echo "### Package Information" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        echo "- **Name**: $(jq -r '.name // "Not specified"' package.json)" >> "$OUTPUT_FILE"
        echo "- **Version**: $(jq -r '.version // "Not specified"' package.json)" >> "$OUTPUT_FILE"
        echo "- **Description**: $(jq -r '.description // "Not specified"' package.json)" >> "$OUTPUT_FILE"

        # Count dependencies
        runtime_deps=$(jq -r '.dependencies // {} | length' package.json)
        dev_deps=$(jq -r '.devDependencies // {} | length' package.json)
        echo "- **Runtime Dependencies**: $runtime_deps" >> "$OUTPUT_FILE"
        echo "- **Development Dependencies**: $dev_deps" >> "$OUTPUT_FILE"
    fi
}

# Main execution
case "${2:-markdown}" in
    "simple")
        generate_tree
        ;;
    "markdown")
        generate_markdown_tree
        analyze_package_json
        ;;
    *)
        echo "Usage: $0 [output_file] [mode]"
        echo "Modes:"
        echo "  simple    - Generate plain directory tree"
        echo "  markdown  - Generate markdown with directory tree and package info (default)"
        exit 1
        ;;
esac

echo "Done!"