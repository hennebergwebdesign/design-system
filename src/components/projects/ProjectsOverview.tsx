"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Palette, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useHydrated } from "@/hooks/use-hydrated";
import { generateScale } from "@/lib/color";
import { useDesignSystemStore } from "@/lib/store";
import type { Project } from "@/lib/types";

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const openProject = useDesignSystemStore((s) => s.openProject);
  const deleteProject = useDesignSystemStore((s) => s.deleteProject);
  const renameProject = useDesignSystemStore((s) => s.renameProject);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(project.name);

  const { colors } = project.system;
  const swatches = [
    colors.primary.light,
    colors.secondary.light,
    colors.accent.light,
    generateScale(colors.neutral.light)["300"],
  ];

  const open = () => {
    openProject(project.id);
    router.push("/editor");
  };

  return (
    <Card className="group cursor-pointer transition-shadow hover:shadow-md" onClick={open}>
      <CardContent className="flex flex-col gap-4">
        <div className="flex h-24 overflow-hidden rounded-lg border">
          {swatches.map((color, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-medium">{project.name}</p>
            <p className="text-muted-foreground text-sm">
              Zuletzt bearbeitet: {formatDate(project.updatedAt)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={() => setRenaming(true)}>
                Umbenennen
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => deleteProject(project.id)}
              >
                Löschen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      <Dialog open={renaming} onOpenChange={setRenaming}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Projekt umbenennen</DialogTitle>
          </DialogHeader>
          <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenaming(false)}>
              Abbrechen
            </Button>
            <Button
              onClick={() => {
                renameProject(project.id, name);
                setRenaming(false);
              }}
            >
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function NewProjectDialog() {
  const router = useRouter();
  const createProject = useDesignSystemStore((s) => s.createProject);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const create = () => {
    createProject(name);
    setOpen(false);
    router.push("/editor");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Neues Design System
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neues Design System</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Projektname, z. B. „Kunde XY Website“"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && create()}
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Abbrechen
          </Button>
          <Button onClick={create}>Erstellen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectsOverview() {
  const hydrated = useHydrated();
  const projects = useDesignSystemStore((s) => s.projects);

  if (!hydrated) return null;

  const sorted = [...projects].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-foreground text-background flex size-10 items-center justify-center rounded-xl">
            <Palette className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Design System Studio</h1>
            <p className="text-muted-foreground text-sm">
              Style Guides definieren, visualisieren und exportieren
            </p>
          </div>
        </div>
        <NewProjectDialog />
      </header>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed py-24 text-center">
          <Palette className="text-muted-foreground size-8" />
          <div>
            <p className="font-medium">Noch keine Projekte</p>
            <p className="text-muted-foreground text-sm">
              Lege dein erstes Design System an, um zu starten.
            </p>
          </div>
          <NewProjectDialog />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
