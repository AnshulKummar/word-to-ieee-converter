/**
 * Constants for IEEE formatting standards
 */

import { IEEEFonts, IEEEMargins } from "./types.js";

export const IEEE_FONTS: IEEEFonts = {
  title: ["Times New Roman", 24, true],
  author: ["Times New Roman", 10, false],
  abstract_heading: ["Times New Roman", 10, true],
  abstract_body: ["Times New Roman", 10, false],
  section_heading: ["Times New Roman", 10, true],
  subsection_heading: ["Times New Roman", 10, true],
  body: ["Times New Roman", 10, false],
  code_block: ["Courier New", 9, false],
  code_caption: ["Times New Roman", 9, false],
  figure_caption: ["Times New Roman", 9, false],
  references: ["Times New Roman", 9, false]
};

export const IEEE_MARGINS: IEEEMargins = {
  top: 0.75,
  bottom: 1.0,
  left: 0.625,
  right: 0.625
};

export const IEEE_FORMATTING_GUIDE = {
  margins: `## IEEE Margins
- Top: 0.75 inches
- Bottom: 1.0 inches
- Left: 0.625 inches
- Right: 0.625 inches`,

  fonts: `## IEEE Fonts
- **Title**: Times New Roman, 24pt, Bold, Centered
- **Author Names**: Times New Roman, 10pt, Regular, Left-aligned
- **Author Affiliations/Titles**: Times New Roman, 10pt, Italic, Left-aligned
- **Abstract Heading**: Times New Roman, 10pt, Bold, Italic
- **Abstract Text**: Times New Roman, 10pt, Regular
- **Section Headings**: Times New Roman, 10pt, Bold
- **Subsection Headings**: Times New Roman, 10pt, Bold, Italic
- **Body Text**: Times New Roman, 10pt, Regular, Justified
- **Code Blocks**: Courier New, 9pt, Monospace, with border and light gray background
- **Code Captions**: Times New Roman, 9pt, Regular, Left-aligned
- **Figure/Table Captions**: Times New Roman, 9pt, Italic, Centered
- **References**: Times New Roman, 9pt, Regular, Hanging Indent`,

  code_blocks: `## Code Block Formatting

### Using Code Block Markers
To format code blocks in your Word document, wrap your code with markers:

1. Add a paragraph with \`<code block start>\` before your code
2. Add your code (can be multiple lines/paragraphs)
3. Add a paragraph with \`<code block end>\` after your code

The markers will be automatically removed, and everything between them will be formatted with:
- Courier New font (9pt)
- Black bordered box
- Light gray background (#F0F0F0)
- Proper indentation
- Single line spacing (1.0)

### Example
\`\`\`
Here is an example of a Python function:

<code block start>
def fetch_data(user_id):
    """Get user data from database."""
    query = "SELECT * FROM users WHERE id=?"
    result = db.execute(query, user_id)
    return result
<code block end>

Code Block 1: Python Function Example
\`\`\``,

  spacing: `## IEEE Spacing
- Single line spacing throughout the document (1.0)
- Proper spacing before/after headings
- First line indentation for body paragraphs (0.3 inches)
- Hanging indent for references (0.25 inches)`,

  all: `# IEEE Document Formatting Standards

## Margins
- Top: 0.75 inches
- Bottom: 1.0 inches
- Left: 0.625 inches
- Right: 0.625 inches

## Fonts
- **Title**: Times New Roman, 24pt, Bold, Centered
- **Author Names**: Times New Roman, 10pt, Regular, Left-aligned
- **Author Affiliations/Titles**: Times New Roman, 10pt, Italic, Left-aligned
- **Abstract Heading**: Times New Roman, 10pt, Bold, Italic
- **Abstract Text**: Times New Roman, 10pt, Regular
- **Section Headings**: Times New Roman, 10pt, Bold
- **Subsection Headings**: Times New Roman, 10pt, Bold, Italic
- **Body Text**: Times New Roman, 10pt, Regular, Justified
- **Code Blocks**: Courier New, 9pt, Monospace, with border and light gray background
- **Code Captions**: Times New Roman, 9pt, Regular, Left-aligned
- **Figure/Table Captions**: Times New Roman, 9pt, Italic, Centered
- **References**: Times New Roman, 9pt, Regular, Hanging Indent

## Spacing
- Single line spacing throughout the document (1.0)
- Proper spacing before/after headings
- First line indentation for body paragraphs (0.3 inches)
- Hanging indent for references (0.25 inches)

## Code Block Formatting

### Using Code Block Markers
To format code blocks in your Word document, wrap your code with markers:

1. Add a paragraph with \`<code block start>\` before your code
2. Add your code (can be multiple lines/paragraphs)
3. Add a paragraph with \`<code block end>\` after your code

The markers will be automatically removed, and everything between them will be formatted with:
- Courier New font (9pt)
- Black bordered box
- Light gray background (#F0F0F0)
- Proper indentation
- Single line spacing (1.0)

### Example
\`\`\`
Here is an example of a Python function:

<code block start>
def fetch_data(user_id):
    """Get user data from database."""
    query = "SELECT * FROM users WHERE id=?"
    result = db.execute(query, user_id)
    return result
<code block end>

Code Block 1: Python Function Example
\`\`\`

## Two-Column Format (Optional)
- IEEE papers can optionally use two-column format
- Column width and spacing follows IEEE standards
- Figures and tables may span both columns when needed`
};

export const CHARACTER_LIMIT = 100000;
