"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EditorShell } from "@/components/editor/editor-shell";
import { renderPanel } from "@/components/editor/panels";

function EditorView() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project") ?? "";
  return <EditorShell projectId={projectId} renderPanel={renderPanel} />;
}

export default function EditorPage() {
  // useSearchParams benötigt im statischen Export eine Suspense-Grenze.
  return (
    <Suspense fallback={null}>
      <EditorView />
    </Suspense>
  );
}
