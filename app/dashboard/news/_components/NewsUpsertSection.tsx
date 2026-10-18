"use client";

import type { JSONContent } from "@tiptap/core";
import { createElement, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor } from "@/components/editor";
import { PageTemplate } from "../../_components/PageTemplate";

function safeLink(href: unknown): string | undefined {
  if (typeof href !== "string") return undefined;

  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function renderContent(node: JSONContent, key: number): ReactNode {
  const children = node.content?.map(renderContent);

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

export function NewsUpsertSection() {
  const [content, setContent] = useState<JSONContent | null>(null);

  return (
    <PageTemplate title="Yeni bülten" description="TBD" action={<Button>Kaydet</Button>}>
      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">Editör</TabsTrigger>
          <TabsTrigger value="preview">Önizleme</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <Editor value={content} onChange={setContent} className="min-h-150" />
        </TabsContent>
        <TabsContent value="preview">
          <div className="typeset typeset-article mx-auto max-w-[37em]">
            {content ? renderContent(content, 0) : <p>Önizlenecek içerik yok.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
}
