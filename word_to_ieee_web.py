#!/usr/bin/env python3
"""
Word to IEEE Format Converter - Web Application
A web interface for converting Microsoft Word documents to IEEE standard format.
"""

import io
import os
import tempfile
from pathlib import Path

from flask import Flask, render_template, request, send_file, flash, redirect, url_for, Response
from werkzeug.utils import secure_filename

from word_to_ieee import IEEEFormatter

app = Flask(__name__)
app.secret_key = 'word-to-ieee-converter-secret-key'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

ALLOWED_EXTENSIONS = {'docx'}


def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET'])
def index():
    """Render the main upload page."""
    return render_template('index.html')


@app.route('/convert', methods=['POST'])
def convert():
    """Handle file upload and conversion."""
    # Check if file was uploaded
    if 'file' not in request.files:
        flash('No file selected. Please upload a Word document.', 'error')
        return redirect(url_for('index'))

    file = request.files['file']

    if file.filename == '':
        flash('No file selected. Please upload a Word document.', 'error')
        return redirect(url_for('index'))

    if not allowed_file(file.filename):
        flash('Invalid file type. Please upload a .docx file.', 'error')
        return redirect(url_for('index'))

    # Get two-column option
    two_column = request.form.get('two_column') == 'on'

    try:
        # Save uploaded file to temp directory
        with tempfile.TemporaryDirectory() as temp_dir:
            filename = secure_filename(file.filename)
            input_path = os.path.join(temp_dir, filename)
            file.save(input_path)

            # Generate output filename
            stem = Path(filename).stem
            suffix = "_IEEE_two_column.docx" if two_column else "_IEEE.docx"
            output_filename = f"{stem}{suffix}"
            output_path = os.path.join(temp_dir, output_filename)

            # Convert the document
            formatter = IEEEFormatter(input_path, output_path, two_column=two_column)
            formatter.apply_ieee_formatting()

            # Read file into memory before temp directory is cleaned up
            with open(output_path, 'rb') as f:
                file_data = io.BytesIO(f.read())

        # Send the converted file for download (outside the temp directory context)
        return send_file(
            file_data,
            as_attachment=True,
            download_name=output_filename,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )

    except Exception as e:
        flash(f'Conversion failed: {str(e)}', 'error')
        return redirect(url_for('index'))


if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    templates_dir = Path(__file__).parent / 'templates'
    templates_dir.mkdir(exist_ok=True)

    print("Starting Word to IEEE Converter Web App...")
    print("Open http://127.0.0.1:5000 in your browser")
    app.run(debug=True, host='127.0.0.1', port=5000)
