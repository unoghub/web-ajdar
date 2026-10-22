import type { JSONContent } from "@tiptap/core";
import { createElement, type ReactNode } from "react";

function safeLink(href: unknown): string | undefined {
  if (typeof href !== "string") return undefined;

  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function renderNode(node: JSONContent, key: number): ReactNode {
  if (!node || typeof node !== "object") return null;
  const children = Array.isArray(node.content) ? node.content.map(renderNode) : null;

  switch (node.type) {
    case "doc":
      return children;
    case "paragraph":
      return <p key={key}>{children}</p>;
    case "heading": {
      const level = Number(node.attrs?.level);
      return [1, 2, 3, 4, 5, 6].includes(level) ? (
        createElement(`h${level}`, { key }, children)
      ) : (
        <p key={key}>{children}</p>
      );
    }
    case "bulletList":
      return <ul key={key}>{children}</ul>;
    case "orderedList":
      return <ol key={key}>{children}</ol>;
    case "listItem":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;
    case "hardBreak":
      return <br key={key} />;
    case "text": {
      return (
        node.marks?.reduce<ReactNode>((text, mark, markIndex) => {
          if (mark.type === "bold") return <strong key={markIndex}>{text}</strong>;
          if (mark.type === "italic") return <em key={markIndex}>{text}</em>;
          if (mark.type === "link") {
            const href = safeLink(mark.attrs?.href);
            return href ? (
              <a key={markIndex} href={href}>
                {text}
              </a>
            ) : (
              text
            );
          }
          return text;
        }, node.text ?? "") ??
        node.text ??
        ""
      );
    }
    default:
      return null;
  }
}

export function NewsContent({ content }: { content: JSONContent }) {
  return renderNode(content, 0);
}
