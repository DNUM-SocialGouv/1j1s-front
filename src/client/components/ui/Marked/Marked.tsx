import { marked } from 'marked';
import React, { useMemo } from 'react';

interface MarkedProps {
  markdown: string
}

export default function Marked ({ markdown }: MarkedProps) {
  const html = useMemo(() => ({ __html: marked.parse(markdown) }), [markdown]);
  return (<div dangerouslySetInnerHTML={ html } />);
}
