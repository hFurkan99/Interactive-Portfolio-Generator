export interface TemplateSettings {
  colors: ColorScheme;
  typography: TypographySettings;
  layout: LayoutSettings;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  border: string;
}

export interface TypographySettings {
  fontFamily: string;
  headingFontFamily?: string;
  fontSize: {
    heading1: string;
    heading2: string;
    heading3: string;
    body: string;
    small: string;
  };
}

export interface LayoutSettings {
  columnCount: 1 | 2;
  spacing: "compact" | "normal" | "relaxed";
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  sectionSpacing: number;
}
