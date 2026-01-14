# Word to IEEE Format Converter

A Python utility that automatically converts Microsoft Word documents to IEEE standard format, applying proper formatting, fonts, margins, and styles according to IEEE publication guidelines.

## Features

- ✅ **Web-based UI** with drag-and-drop file upload
- ✅ Automatic IEEE margin formatting (0.75" top, 1.0" bottom, 0.625" sides)
- ✅ IEEE-compliant font settings (Times New Roman, appropriate sizes)
- ✅ **Two-column format support** (optional, IEEE standard)
- ✅ Automatic detection and formatting of:
  - Title and author information
  - Abstract section
  - Section headings (I., II., III., etc.)
  - Subsection headings (A., B., C., etc.)
  - Figure and table captions
  - References
  - Body text with proper indentation
- ✅ Table formatting
- ✅ Single spacing throughout
- ✅ Proper paragraph alignment and indentation

## Installation

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Install Dependencies

```bash
pip install -r requirements.txt
```

Or install directly:

```bash
pip install python-docx flask
```

## Usage

### Web Interface (Recommended)

The easiest way to use the converter is through the web interface:

```bash
python word_to_ieee_web.py
```

Then open http://127.0.0.1:5000 in your browser. You can:
- Drag and drop your `.docx` file onto the upload area
- Or click to browse and select a file
- Toggle the two-column format option
- Click "Convert to IEEE Format" to download the converted document

### Command Line Interface

Convert a Word document to IEEE format:

```bash
python word_to_ieee.py input_document.docx
```

This will create a new file named `input_document_IEEE.docx` in the same directory.

### Two-Column Format

Enable IEEE standard two-column format:

```bash
python word_to_ieee.py input_document.docx --two-column
```

Or use the short flag:

```bash
python word_to_ieee.py input_document.docx -2
```

### Specify Output File

You can also specify a custom output filename:

```bash
python word_to_ieee.py input_document.docx output_ieee.docx
```

Or use the `-o` flag:

```bash
python word_to_ieee.py input_document.docx -o output_ieee.docx --two-column
```

### Example

```bash
# Convert paper.docx to IEEE format (single column)
python word_to_ieee.py paper.docx

# Convert paper.docx to IEEE format with two columns
python word_to_ieee.py paper.docx --two-column

# Specify custom output file with two-column format
python word_to_ieee.py paper.docx -o formatted_paper.docx --two-column

# Output: paper_IEEE.docx created in the same directory
```

### Command-Line Options

- `input_file` - Input Word document (.docx) [required]
- `output_file` - Output Word document [optional, positional]
- `-o, --output` - Alternative way to specify output file
- `--two-column, -2` - Enable two-column format (IEEE standard)
- `--version` - Show version information
- `-h, --help` - Show help message

## IEEE Format Specifications

The converter applies the following IEEE standards:

### Margins
- Top: 0.75 inches
- Bottom: 1.0 inches
- Left: 0.625 inches
- Right: 0.625 inches

### Fonts
- **Title**: Times New Roman, 24pt, Bold, Centered
- **Author Names**: Times New Roman, 10pt, Regular, Left-aligned
- **Author Affiliations/Titles**: Times New Roman, 10pt, Italic, Left-aligned
- **Abstract Heading**: Times New Roman, 10pt, Bold, Italic
- **Abstract Text**: Times New Roman, 10pt, Regular
- **Section Headings**: Times New Roman, 10pt, Bold
- **Subsection Headings**: Times New Roman, 10pt, Bold, Italic
- **Body Text**: Times New Roman, 10pt, Regular, Justified
- **Figure/Table Captions**: Times New Roman, 9pt, Italic, Centered
- **References**: Times New Roman, 9pt, Regular, Hanging Indent

### Spacing
- Single line spacing throughout
- Proper spacing before/after headings
- First line indentation for body paragraphs
- Hanging indent for references

## How It Works

The converter:

1. **Reads** your Word document
2. **Detects** different elements (title, sections, subsections, etc.)
3. **Applies** IEEE formatting rules to each element
4. **Saves** the formatted document

### Detection Logic

- **Title**: First non-empty paragraph (excluding author info keywords)
- **Author Section**: All paragraphs between title and abstract, including:
  - Author names
  - Affiliations and departments
  - Email addresses
  - Locations (city, state)
  - Job titles
- **Abstract**: Paragraph starting with "Abstract"
- **Sections**: Paragraphs starting with Roman numerals (I., II., III., etc.) or numbers (1., 2., 3., etc.)
- **Subsections**: Paragraphs starting with letters (A., B., C., etc.)
- **Figure Captions**: Text starting with "Figure" or "Fig."
- **Table Captions**: Text starting with "Table"
- **References**: Paragraphs starting with "[number]"

## Recent Improvements (v1.2.0)

- **Enhanced Author Detection**: Improved detection of author sections between title and abstract
- **Better Author Formatting**: Author names, affiliations, and contact information now follow IEEE standards more closely
- **XML-level Font Control**: Direct XML manipulation ensures more reliable font formatting
- **Paragraph-level Formatting**: Better handling of paragraph-level properties that may override run formatting

## Limitations

- The converter uses heuristics to detect document elements. For best results:
  - Ensure your document has a clear title as the first paragraph
  - Place all author information (names, affiliations, emails) between the title and abstract
  - Include an "Abstract" heading to mark the start of abstract section
  - Use standard section numbering (I., II., III. or 1., 2., 3.)
  - Label figures and tables clearly
- Two-column format is optional (use `--two-column` flag to enable it)
- In two-column mode, title and author sections are currently included in the two-column layout
  - For best results with two-column format, consider manually keeping title/authors in single-column
- Complex formatting may require manual adjustment
- Images and embedded objects are preserved but not reformatted
- Some Word documents with heavily customized styles may require manual fine-tuning after conversion

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created as a utility for converting academic papers to IEEE format.

## Support

If you encounter any issues or have suggestions for improvement, please open an issue on GitHub.

## Acknowledgments

This utility is designed to help researchers and authors format their papers according to IEEE publication standards.
