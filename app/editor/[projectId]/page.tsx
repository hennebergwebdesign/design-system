"use client";

import { use } from "react";
import { EditorShell } from "@/components/editor/editor-shell";
import { renderPanel } from "@/components/editor/panels";

export default function EditorPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  return <EditorShell projectId={projectId} renderPanel={renderPanel} />;
}
