#!/usr/bin/env python3
"""
Word to IEEE Format Converter
A utility to convert Microsoft Word documents to IEEE standard format.
"""

import os
import sys
from pathlib import Path
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE


class IEEEFormatter:
    """Handles conversion of Word documents to IEEE format."""
    
    # IEEE Format Specifications
    IEEE_MARGINS = {
        'top': Inches(0.75),
        'bottom': Inches(1.0),
        'left': Inches(0.625),
        'right': Inches(0.625)
    }
    
    IEEE_FONTS = {
        'title': ('Times New Roman', 24, True),  # 24pt, Bold
        'author': ('Times New Roman', 10, False),  # 10pt, Regular
        'abstract_heading': ('Times New Roman', 10, True, True),  # 10pt, Bold, Italic
        'abstract_text': ('Times New Roman', 10, False),
        'section_heading': ('Times New Roman', 10, True),  # 10pt, Bold
        'subsection_heading': ('Times New Roman', 10, True, True),  # 10pt, Bold, Italic
        'body': ('Times New Roman', 10, False),  # 10pt, Regular
        'figure_caption': ('Times New Roman', 9, False, True),  # 9pt, Italic
        'table_caption': ('Times New Roman', 9, False, True),  # 9pt, Italic
        'reference': ('Times New Roman', 9, False)  # 9pt, Regular
    }
    
    IEEE_SPACING = {
        'before_paragraph': Pt(0),
        'after_paragraph': Pt(0),
        'line_spacing': 1.0  # Single spacing
    }
    
    def __init__(self, input_file, output_file=None):
        """
        Initialize the IEEE formatter.
        
        Args:
            input_file: Path to input Word document
            output_file: Path to output Word document (optional)
        """
        self.input_file = Path(input_file)
        if not self.input_file.exists():
            raise FileNotFoundError(f"Input file not found: {input_file}")
        
        if output_file:
            self.output_file = Path(output_file)
        else:
            self.output_file = self.input_file.parent / f"{self.input_file.stem}_IEEE{self.input_file.suffix}"
        
        self.doc = Document(str(self.input_file))
    
    def apply_ieee_formatting(self):
        """Apply IEEE formatting to the entire document."""
        print("Applying IEEE formatting...")
        
        # Set page margins
        self._set_margins()
        
        # Format all paragraphs
        self._format_paragraphs()
        
        # Format tables
        self._format_tables()
        
        # Ensure proper section structure
        self._format_sections()
        
        print(f"Formatting complete. Saving to: {self.output_file}")
        self.doc.save(str(self.output_file))
        return self.output_file
    
    def _set_margins(self):
        """Set IEEE standard margins."""
        sections = self.doc.sections
        for section in sections:
            section.top_margin = self.IEEE_MARGINS['top']
            section.bottom_margin = self.IEEE_MARGINS['bottom']
            section.left_margin = self.IEEE_MARGINS['left']
            section.right_margin = self.IEEE_MARGINS['right']
    
    def _format_paragraphs(self):
        """Format all paragraphs according to IEEE standards."""
        for paragraph in self.doc.paragraphs:
            # Skip empty paragraphs
            if not paragraph.text.strip():
                continue
            
            # Detect paragraph type and format accordingly
            text = paragraph.text.strip()
            
            # Title detection (usually first paragraph, large font, centered)
            if self._is_title(paragraph):
                self._format_title(paragraph)
            elif self._is_author(paragraph):
                self._format_author(paragraph)
            elif self._is_abstract_heading(paragraph):
                self._format_abstract_heading(paragraph)
            elif self._is_section_heading(paragraph):
                self._format_section_heading(paragraph)
            elif self._is_subsection_heading(paragraph):
                self._format_subsection_heading(paragraph)
            elif self._is_figure_caption(paragraph):
                self._format_figure_caption(paragraph)
            elif self._is_table_caption(paragraph):
                self._format_table_caption(paragraph)
            elif self._is_reference(paragraph):
                self._format_reference(paragraph)
            else:
                self._format_body_text(paragraph)
    
    def _is_title(self, paragraph):
        """Check if paragraph is a title."""
        # Title is usually first non-empty paragraph, centered, and shorter
        if paragraph == self.doc.paragraphs[0] or len(paragraph.text) < 200:
            return paragraph.alignment == WD_ALIGN_PARAGRAPH.CENTER
        return False
    
    def _is_author(self, paragraph):
        """Check if paragraph contains author information."""
        text = paragraph.text.lower()
        return any(keyword in text for keyword in ['author', '@', 'email', 'university', 'department'])
    
    def _is_abstract_heading(self, paragraph):
        """Check if paragraph is abstract heading."""
        return paragraph.text.strip().lower() == 'abstract'
    
    def _is_section_heading(self, paragraph):
        """Check if paragraph is a section heading (I., II., III., etc.)."""
        text = paragraph.text.strip()
        # Check for Roman numerals or numbered sections
        if len(text) < 100 and (text.startswith('I.') or text.startswith('II.') or 
                                text.startswith('III.') or text.startswith('IV.') or
                                text.startswith('V.') or text.startswith('VI.') or
                                text.startswith('VII.') or text.startswith('VIII.') or
                                text.startswith('IX.') or text.startswith('X.')):
            return True
        # Check for numbered sections (1., 2., 3., etc.)
        if len(text) < 100 and text[0].isdigit() and '.' in text[:3]:
            return True
        return False
    
    def _is_subsection_heading(self, paragraph):
        """Check if paragraph is a subsection heading (A., B., C., etc.)."""
        text = paragraph.text.strip()
        if len(text) < 100 and len(text) > 2:
            # Check for letter subsections (A., B., C., etc.)
            if text[0].isalpha() and text[1] == '.':
                return True
        return False
    
    def _is_figure_caption(self, paragraph):
        """Check if paragraph is a figure caption."""
        text = paragraph.text.strip().lower()
        return text.startswith('figure') or text.startswith('fig.')
    
    def _is_table_caption(self, paragraph):
        """Check if paragraph is a table caption."""
        text = paragraph.text.strip().lower()
        return text.startswith('table')
    
    def _is_reference(self, paragraph):
        """Check if paragraph is a reference."""
        text = paragraph.text.strip()
        # References usually start with [number]
        return text.startswith('[') and text[1].isdigit()
    
    def _format_title(self, paragraph):
        """Format title paragraph."""
        font_name, font_size, is_bold = self.IEEE_FONTS['title']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
        self._apply_font(paragraph, font_name, font_size, is_bold)
        paragraph.paragraph_format.space_before = Pt(12)
        paragraph.paragraph_format.space_after = Pt(12)
    
    def _format_author(self, paragraph):
        """Format author paragraph."""
        font_name, font_size, is_bold = self.IEEE_FONTS['author']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
        self._apply_font(paragraph, font_name, font_size, is_bold)
        paragraph.paragraph_format.space_after = Pt(6)
    
    def _format_abstract_heading(self, paragraph):
        """Format abstract heading."""
        font_name, font_size, is_bold, is_italic = self.IEEE_FONTS['abstract_heading']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT
        self._apply_font(paragraph, font_name, font_size, is_bold, is_italic)
        paragraph.paragraph_format.space_before = Pt(12)
        paragraph.paragraph_format.space_after = Pt(6)
    
    def _format_section_heading(self, paragraph):
        """Format section heading."""
        font_name, font_size, is_bold = self.IEEE_FONTS['section_heading']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT
        self._apply_font(paragraph, font_name, font_size, is_bold)
        paragraph.paragraph_format.space_before = Pt(12)
        paragraph.paragraph_format.space_after = Pt(6)
    
    def _format_subsection_heading(self, paragraph):
        """Format subsection heading."""
        font_name, font_size, is_bold, is_italic = self.IEEE_FONTS['subsection_heading']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT
        self._apply_font(paragraph, font_name, font_size, is_bold, is_italic)
        paragraph.paragraph_format.space_before = Pt(6)
        paragraph.paragraph_format.space_after = Pt(3)
    
    def _format_figure_caption(self, paragraph):
        """Format figure caption."""
        font_name, font_size, is_bold, is_italic = self.IEEE_FONTS['figure_caption']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
        self._apply_font(paragraph, font_name, font_size, is_bold, is_italic)
        paragraph.paragraph_format.space_before = Pt(6)
        paragraph.paragraph_format.space_after = Pt(6)
    
    def _format_table_caption(self, paragraph):
        """Format table caption."""
        font_name, font_size, is_bold, is_italic = self.IEEE_FONTS['table_caption']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
        self._apply_font(paragraph, font_name, font_size, is_bold, is_italic)
        paragraph.paragraph_format.space_before = Pt(6)
        paragraph.paragraph_format.space_after = Pt(3)
    
    def _format_reference(self, paragraph):
        """Format reference paragraph."""
        font_name, font_size, is_bold = self.IEEE_FONTS['reference']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT
        self._apply_font(paragraph, font_name, font_size, is_bold)
        paragraph.paragraph_format.first_line_indent = Inches(-0.25)  # Hanging indent
        paragraph.paragraph_format.left_indent = Inches(0.25)
        paragraph.paragraph_format.space_after = Pt(0)
    
    def _format_body_text(self, paragraph):
        """Format regular body text."""
        font_name, font_size, is_bold = self.IEEE_FONTS['body']
        paragraph.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        self._apply_font(paragraph, font_name, font_size, is_bold)
        paragraph.paragraph_format.first_line_indent = Inches(0.25)  # First line indent
        paragraph.paragraph_format.space_after = Pt(0)
        paragraph.paragraph_format.line_spacing = self.IEEE_SPACING['line_spacing']
    
    def _apply_font(self, paragraph, font_name, font_size, is_bold=False, is_italic=False):
        """Apply font formatting to paragraph."""
        for run in paragraph.runs:
            run.font.name = font_name
            run.font.size = Pt(font_size)
            run.font.bold = is_bold
            run.font.italic = is_italic
            run.font.color.rgb = RGBColor(0, 0, 0)  # Black
    
    def _format_tables(self):
        """Format all tables according to IEEE standards."""
        for table in self.doc.tables:
            # Set table font
            for row in table.rows:
                for cell in row.cells:
                    for paragraph in cell.paragraphs:
                        for run in paragraph.runs:
                            run.font.name = 'Times New Roman'
                            run.font.size = Pt(9)  # Table text is typically 9pt
                            paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    def _format_sections(self):
        """Ensure proper section formatting."""
        # IEEE papers typically use two-column format, but we'll keep single column
        # for simplicity. Users can manually adjust if needed.
        pass


def main():
    """Main entry point for the converter."""
    if len(sys.argv) < 2:
        print("Usage: python word_to_ieee.py <input_file.docx> [output_file.docx]")
        print("\nExample:")
        print("  python word_to_ieee.py paper.docx")
        print("  python word_to_ieee.py paper.docx paper_ieee.docx")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    try:
        formatter = IEEEFormatter(input_file, output_file)
        output_path = formatter.apply_ieee_formatting()
        print(f"\n✓ Success! IEEE-formatted document saved to: {output_path}")
    except Exception as e:
        print(f"\n✗ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
