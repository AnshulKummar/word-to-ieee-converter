from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="word-to-ieee-converter",
    version="1.0.0",
    author="Anshul Kumar",
    author_email="kanshul24@gmail.com",
    description="A utility to convert Microsoft Word documents to IEEE standard format",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/AnshulKummar/word-to-ieee-converter",
    py_modules=["word_to_ieee", "word_to_ieee_web"],
    package_data={"": ["templates/*.html"]},
    include_package_data=True,
    install_requires=requirements,
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Science/Research",
        "Topic :: Text Processing :: Markup",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.7",
    entry_points={
        "console_scripts": [
            "word-to-ieee=word_to_ieee:main",
            "word-to-ieee-web=word_to_ieee_web:app.run",
        ],
    },
)
