"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { JSONContent } from "@tiptap/core";
import { Placeholder } from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Link2, List, ListOrdered, Quote, Redo2, Undo2, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const emptyDocument: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

const headingLevels = [1, 2, 3, 4, 5, 6] as const;
type HeadingLevel = (typeof headingLevels)[number];

export interface EditorProps {
  value: JSONContent | null;
  onChange: (value: JSONContent) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface ToolbarButtonProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

function ToolbarButton({
  label,
  icon,
  onClick,
  active = false,
  disabled = false,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant={active ? "secondary" : "ghost"}
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

function normalizeLink(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (!["http:", "https:", "mailto:"].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function Editor({
  value,
  onChange,
  placeholder = "İçeriği yazın…",
  disabled = false,
  className,
}: EditorProps) {
  const onChangeRef = useRef(onChange);
  const linkId = useId();
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: { levels: [...headingLevels] },
          code: false,
          codeBlock: false,
          horizontalRule: false,
          strike: false,
          underline: false,
          link: { openOnClick: false },
        }),
        Placeholder.configure({ placeholder }),
      ],
      content: value ?? emptyDocument,
      editable: !disabled,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: "min-h-48 outline-none",
          "aria-label": "İçerik editörü",
        },
      },
      onUpdate: ({ editor: currentEditor }) => {
        onChangeRef.current(currentEditor.getJSON());
      },
    },
    [placeholder],
  );

  useEffect(() => {
    if (!editor) return;
    const nextValue = value ?? emptyDocument;
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(nextValue)) {
      editor.commands.setContent(nextValue, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) return null;
      return {
        headingLevel: currentEditor.isActive("heading")
          ? currentEditor.getAttributes("heading").level
          : null,
        bold: currentEditor.isActive("bold"),
        italic: currentEditor.isActive("italic"),
        bulletList: currentEditor.isActive("bulletList"),
        orderedList: currentEditor.isActive("orderedList"),
        blockquote: currentEditor.isActive("blockquote"),
        link: currentEditor.isActive("link"),
        canUndo: currentEditor.can().undo(),
        canRedo: currentEditor.can().redo(),
        hasSelection: !currentEditor.state.selection.empty,
      };
    },
  });

  function openLinkEditor() {
    if (!editor) return;
    setLinkValue(editor.getAttributes("link").href ?? "");
    setLinkError("");
    setLinkOpen(true);
  }

  function submitLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor) return;
    const href = normalizeLink(linkValue);
    if (!href) {
      setLinkError("Geçerli bir HTTP, HTTPS veya e-posta bağlantısı girin.");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setLinkOpen(false);
    setLinkError("");
  }

  const toolbarDisabled = !editor || disabled;

  function changeBlockType(value: string) {
    if (!editor) return;
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
      return;
    }

    const level = Number(value);
    if (headingLevels.includes(level as HeadingLevel)) {
      editor
        .chain()
        .focus()
        .setHeading({ level: level as HeadingLevel })
        .run();
    }
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-background", className)}>
      <div
        role="toolbar"
        aria-label="Metin biçimlendirme"
        className="flex flex-wrap items-center gap-1 border-b border-border p-2"
      >
        <select
          aria-label="Blok biçimi"
          className="h-8 cursor-pointer rounded-lg border border-border bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={state?.headingLevel ?? "paragraph"}
          disabled={toolbarDisabled}
          onChange={(event) => changeBlockType(event.target.value)}
        >
          <option value="paragraph">Paragraf</option>
          {headingLevels.map((level) => (
            <option key={level} value={level}>
              Başlık {level}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton
          label="Kalın"
          icon={<Bold />}
          active={state?.bold}
          disabled={toolbarDisabled}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="İtalik"
          icon={<Italic />}
          active={state?.italic}
          disabled={toolbarDisabled}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton
          label="Madde işaretli liste"
          icon={<List />}
          active={state?.bulletList}
          disabled={toolbarDisabled}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Numaralı liste"
          icon={<ListOrdered />}
          active={state?.orderedList}
          disabled={toolbarDisabled}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Alıntı"
          icon={<Quote />}
          active={state?.blockquote}
          disabled={toolbarDisabled}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton
          label="Bağlantı ekle veya düzenle"
          icon={<Link2 />}
          active={state?.link}
          disabled={toolbarDisabled || (!state?.hasSelection && !state?.link)}
          onClick={openLinkEditor}
        />
        <ToolbarButton
          label="Bağlantıyı kaldır"
          icon={<Unlink />}
          disabled={toolbarDisabled || !state?.link}
          onClick={() => editor?.chain().focus().unsetLink().run()}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton
          label="Geri al"
          icon={<Undo2 />}
          disabled={toolbarDisabled || !state?.canUndo}
          onClick={() => editor?.chain().focus().undo().run()}
        />
        <ToolbarButton
          label="İleri al"
          icon={<Redo2 />}
          disabled={toolbarDisabled || !state?.canRedo}
          onClick={() => editor?.chain().focus().redo().run()}
        />
      </div>

      {linkOpen && !disabled && (
        <form
          onSubmit={submitLink}
          className="flex flex-wrap items-end gap-2 border-b border-border p-3"
        >
          <div className="min-w-48 flex-1">
            <label htmlFor={linkId} className="mb-1 block text-xs font-medium">
              Bağlantı adresi
            </label>
            <Input
              id={linkId}
              type="text"
              inputMode="url"
              value={linkValue}
              onChange={(event) => {
                setLinkValue(event.target.value);
                setLinkError("");
              }}
              placeholder="https://example.com"
              aria-invalid={!!linkError}
              aria-describedby={linkError ? `${linkId}-error` : undefined}
            />
            {linkError && (
              <p id={`${linkId}-error`} className="mt-1 text-xs text-destructive">
                {linkError}
              </p>
            )}
          </div>
          <Button type="submit" size="sm">
            Kaydet
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setLinkOpen(false)}>
            Vazgeç
          </Button>
        </form>
      )}

      <EditorContent
        editor={editor}
        className="shared-editor typeset typeset-article [&_.tiptap]:min-h-48 [&_.tiptap]:p-4 [&_.tiptap]:outline-none"
      />
    </div>
  );
}
