/**
 * Type definitions for IEEE DOCX MCP Server
 */

export enum ResponseFormat {
  MARKDOWN = "markdown",
  JSON = "json"
}

export interface IEEEFonts {
  title: [string, number, boolean];
  author: [string, number, boolean];
  abstract_heading: [string, number, boolean];
  abstract_body: [string, number, boolean];
  section_heading: [string, number, boolean];
  subsection_heading: [string, number, boolean];
  body: [string, number, boolean];
  code_block: [string, number, boolean];
  code_caption: [string, number, boolean];
  figure_caption: [string, number, boolean];
  references: [string, number, boolean];
}

export interface IEEEMargins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ValidationIssue {
  type: "font" | "margin" | "spacing" | "code_block" | "other";
  severity: "error" | "warning" | "info";
  location: string;
  message: string;
  expected?: string;
  actual?: string;
}

export interface ValidationReport {
  isValid: boolean;
  issueCount: number;
  issues: ValidationIssue[];
  summary: string;
}

export interface ConversionResult {
  success: boolean;
  message: string;
  outputBase64?: string;
  errors?: string[];
}

export interface FormattingGuide {
  section: string;
  details: string;
}
