# Changelog - Version 1.4.0

## Major Changes

### 1. Marker-Based Code Block Detection

**Problem Solved**: Previous versions used automatic detection which sometimes incorrectly identified regular text as code.

**Solution**: Introduced explicit markers for precise control:
- Add `<code block start>` before your code
- Add `<code block end>` after your code
- Everything between these markers gets formatted as code
- Markers are automatically removed from the output

**Benefits**:
- ✓ No false positives
- ✓ Complete user control
- ✓ Works with any programming language
- ✓ Case-insensitive markers

### 2. Improved Line Break Preservation

**Problem Solved**: Multi-line code blocks might have lines run together or improper spacing.

**Solution**: Enhanced `_format_code_block_group()` method with:
- `_split_code_paragraph_by_lines()` helper function
- Converts `\n` characters to Word's native line breaks (`<w:br>`)
- Preserves whitespace using `xml:space="preserve"`
- Applies single line spacing (1.0) for code blocks

**Technical Details**:
```python
# New method added
def _split_code_paragraph_by_lines(self, paragraph):
    """Split a paragraph containing newlines into proper line breaks using w:br elements."""
    # For each run containing \n:
    # 1. Split text by newlines
    # 2. Create <w:t> elements with xml:space="preserve"
    # 3. Insert <w:br> elements between lines
```

**Benefits**:
- ✓ Each line of code appears on its own line
- ✓ Indentation (spaces/tabs) preserved exactly
- ✓ Empty lines within code blocks maintained
- ✓ Proper single spacing between lines
- ✓ No extra gaps or compressed text

### 3. Enhanced Code Formatting

**IEEE Standard Compliance**:
- Font: Courier New, 9pt (monospace)
- Line Spacing: 1.0 (single)
- Background: #F0F0F0 (light gray)
- Borders: 1pt solid black
- Margins: 0.25" left and right
- Alignment: Left-aligned
- First-line indent: 0pt (no indent)

## Files Modified

1. **word_to_ieee.py**
   - Modified `_format_paragraphs()` to detect and handle markers
   - Enhanced `_format_code_block_group()` with line break handling
   - Added `_split_code_paragraph_by_lines()` helper method
   - Added single line spacing for code blocks

2. **create_code_test.py**
   - Added markers around all code examples
   - Updated to demonstrate proper marker usage

3. **README.md**
   - Updated detection logic section
   - Added v1.4.0 release notes
   - Documented code formatting improvements

4. **CODE_BLOCK_USAGE.md** (new file)
   - Quick start guide for using markers
   - Examples and tips
   - Detailed formatting specifications

5. **test_formatting_guide.md** (new file)
   - Testing instructions
   - Before/after comparison
   - Expected output format

## Migration Guide

### For Existing Users

If you have documents that relied on automatic code detection:

**Option 1**: Add markers manually
```
<code block start>
[your code here]
<code block end>
```

**Option 2**: Continue using v1.3.0 (automatic detection still works, but not recommended)

### For New Users

Simply wrap all code sections with markers:
```
Your text here...

<code block start>
def example():
    print("Hello")
<code block end>

More text...
```

## Testing

Run the test suite:
```bash
# Create test document
python create_code_test.py

# Convert to IEEE format
python word_to_ieee.py examples/test_code_blocks.docx examples/output.docx

# Or use web interface
python word_to_ieee_web.py
# Then open http://127.0.0.1:5000
```

## Known Issues

None reported.

## Future Enhancements

Potential improvements for future versions:
- Support for syntax highlighting (colored code)
- Line numbering for code blocks
- Support for different code block styles (e.g., ACM, Springer)
- Automatic language detection and formatting

---

**Release Date**: 2026-01-20
**Version**: 1.4.0
**Compatibility**: Python 3.7+
