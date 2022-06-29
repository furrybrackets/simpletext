import MarkdownIt from "markdown-it";
import shiki from "shiki";

export default function CommonMark(source: string, theme?: string): string {
  let hi;
  const highlight = shiki
    .getHighlighter({
      theme: theme ? theme : 'material-palenight',
    })
    .then((highlighter) => {
      hi = highlighter;
    });

  const md = MarkdownIt({
    html: false,
    xhtmlOut: true,
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
    highlight: (str, lang) => {
      if (lang && highlight[lang]) {
        try {
          return hi(str, { lang });
        } catch (__) {
          return "";
        }
      }
    },
  });
  return md.render(source);
};