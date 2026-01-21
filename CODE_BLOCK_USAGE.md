# How to Use Code Block Markers

## Quick Guide

To format code blocks in your Word document, simply wrap your code with markers:

1. Add a paragraph with `<code block start>` before your code
2. Add your code (can be multiple lines/paragraphs)
3. Add a paragraph with `<code block end>` after your code

The markers will be automatically removed, and everything between them will be formatted with:
- Courier New font (9pt)
- Black bordered box
- Light gray background
- Proper indentation

## Example

In your Word document, write:

```
Here is an example of a Python function:

<code block start>
def fetch_trait_profile(profile_id):
    """Retrieve trait profile from database."""
    result = db.query(
        "SELECT * FROM TraitProfiles WHERE Profile_ID=?",
        profile_id
    )
    return result
<code block end>

Code Block 1: Python Function Example
```

## Result

After conversion:
- The `<code block start>` line disappears
- The `<code block end>` line disappears
- The code appears in a bordered box with gray background
- The caption "Code Block 1: Python Function Example" is formatted as a code caption

## Tips

- Markers are **case-insensitive** (`<CODE BLOCK START>` works too)
- Use markers for **any code**: Python, SQL, JavaScript, Java, C++, etc.
- You can have **multiple code blocks** in one document
- **Line breaks are preserved**: Each line of code appears on its own line
- **Indentation is preserved**: Spaces and tabs are maintained
- Empty lines within the code block are preserved
- Don't put the markers inside the code itself - they should be separate paragraphs

## Code Formatting Details

The converter applies IEEE-standard code formatting:

- **Font**: Courier New, 9pt (monospace)
- **Line Spacing**: Single spacing (1.0)
- **Background**: Light gray (#F0F0F0)
- **Borders**: 1pt solid black box around entire code block
- **Indentation**: 0.25" left and right margins
- **Whitespace**: All spaces, tabs, and line breaks are preserved exactly as in your original code
