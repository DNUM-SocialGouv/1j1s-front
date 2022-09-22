export interface CommonProps {
  className?: string | string[] | Record<string, boolean>
}

export type HtmlHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';


export enum Color {
  WHITE = 'white',
  PRIMARY = 'primary',
  WHITE_LILAC = 'white-lilac',
  GRADIENT_TO_PRIMARY = 'gradient-to-primary'
}

export interface Link {
  title: string
  url: string
}
