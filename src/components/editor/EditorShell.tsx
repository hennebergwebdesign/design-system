"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Image,
  LayoutGrid,
  Palette,
  Redo2,
  Ruler,
  Sparkles,
  Type,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHydrated } from "@/hooks/use-hydrated";
import { useActiveProject, useDesignSystemStore } from "@/lib/store";
import type { EditorSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColorsPanel } from "@/components/panels/ColorsPanel";
import { PlaceholderPanel } from "@/components/panels/PlaceholderPanel";
import { PreviewPane } from "@/components/preview/PreviewPane";

const SECTIONS: { key: EditorSection; label: string; icon: React.ElementType }[] = [
  { key: "colors", label: "Colors", icon: Palette },
  { key: "typography", label: "Typography", icon: Type },
  { key: "logo", label: "Logo", icon: Image },
  { key: "spacing", label: "Spacing", icon: Ruler },
  { key: "effects", label: "Effects", icon: Sparkles },
  { key: "components", label: "Components", icon: LayoutGrid },
  { key: "export", label: "Export", icon: Download },
];

function SectionPanel({ section }: { section: EditorSection }) {
  switch (section) {
    case "colors":
      return <ColorsPanel />;
    default:
      return <PlaceholderPanel section={section} />;
  }
}

export function EditorShell() {
  const hydrated = useHydrated();
  const router = useRouter();
  const project = useActiveProject();
  const activeSection = useDesignSystemStore((s) => s.activeSection);
  const setActiveSection = useDesignSystemStore((s) => s.setActiveSection);
  const undo = useDesignSystemStore((s) => s.undo);
  const redo = useDesignSystemStore((s) => s.redo);
  const canUndo = useDesignSystemStore((s) => s.past.length > 0);
  const canRedo = useDesignSystemStore((s) => s.future.length > 0);

  // Keyboard shortcuts: Cmd/Ctrl+Z = Undo, Shift+Cmd/Ctrl+Z or Ctrl+Y = Redo
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  // Without an active project the editor has nothing to show.
  useEffect(() => {
    if (hydrated && !project) router.replace("/");
  }, [hydrated, project, router]);

  if (!hydrated || !project) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="bg-sidebar flex w-56 shrink-0 flex-col border-r">
        <div className="flex items-center gap-2 px-4 py-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{project.name}</p>
            <p className="text-muted-foreground text-xs">Design System</p>
          </div>
        </div>
        <Separator />
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeSection === key
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="flex items-center gap-1 p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo}>
                <Undo2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rückgängig (⌘Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo}>
                <Redo2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Wiederholen (⇧⌘Z)</TooltipContent>
          </Tooltip>
        </div>
      </aside>

      {/* Settings panel */}
      <div className="w-[400px] shrink-0 overflow-y-auto border-r">
        <SectionPanel section={activeSection} />
      </div>

      {/* Live preview */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        <PreviewPane />
      </main>
    </div>
  );
}
