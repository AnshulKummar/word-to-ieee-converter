# Testing Code Block Formatting

## What We Fixed

### Before v1.4.0
- Code blocks were auto-detected (sometimes incorrectly)
- Line breaks within code might not be preserved properly
- No precise control over what gets formatted as code

### After v1.4.0
- **Explicit markers** for precise control: `<code block start>` and `<code block end>`
- **Line breaks preserved** using Word's native line break elements (w:br)
- **Single line spacing** for better readability (1.0)
- **Indentation preserved** with xml:space="preserve"
- **Proper spacing** with no extra gaps between code lines

## How to Test

1. Open the web interface: http://127.0.0.1:5000

2. Create a test document with code:
   ```
   II. CODE EXAMPLE

   The following shows a Python function:

   <code block start>
   def fetch_data(user_id):
       """Get user data from database."""
       query = "SELECT * FROM users WHERE id=?"
       result = db.execute(query, user_id)
       return result
   <code block end>

   Code Block 1: Database Query Function
   ```

3. Upload and convert the document

4. Check the output:
   - ✓ Code appears in a gray box with black border
   - ✓ Each line of code is on a separate line (no run-together text)
   - ✓ Indentation (4 spaces) is preserved
   - ✓ Font is Courier New, 9pt
   - ✓ No extra spacing between code lines
   - ✓ Markers `<code block start>` and `<code block end>` are removed

## Expected Output Format

The code should look like this in the final document:

```
┌─────────────────────────────────────────────────┐
│ def fetch_data(user_id):                       │
│     """Get user data from database."""         │
│     query = "SELECT * FROM users WHERE id=?"   │
│     result = db.execute(query, user_id)        │
│     return result                              │
└─────────────────────────────────────────────────┘

Code Block 1: Database Query Function
```

With:
- Gray background (#F0F0F0)
- Black 1pt border
- Courier New 9pt font
- Proper indentation
- Single line spacing
