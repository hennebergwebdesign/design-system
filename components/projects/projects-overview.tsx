"use client";

// Übersichtsseite: alle gespeicherten Design-System-Projekte verwalten.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Palette, Pencil, Plus, Trash2 } from "lucide-react";
import { useDesignStore } from "@/lib/store/design-store";
import { generateScale } from "@/lib/design-system/color";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export function ProjectsOverview() {
  const router = useRouter();
  const projects = useDesignStore((s) => s.projects);
  const hydrated = useDesignStore((s) => s.hydrated);
  const createProject = useDesignStore((s) => s.createProject);
  const deleteProject = useDesignStore((s) => s.deleteProject);
  const renameProject = useDesignStore((s) => s.renameProject);
  const duplicateProject = useDesignStore((s) => s.duplicateProject);

  const [newName, setNewName] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const list = Object.values(projects).sort((a, b) => b.updatedAt - a.updatedAt);

  const handleCreate = () => {
    const id = createProject(newName);
    setNewName("");
    setCreateOpen(false);
    router.push(`/editor?project=${id}`);
  };

  if (!hydrated) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        Lade Projekte …
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Palette className="size-5" />
            <span className="text-sm font-medium tracking-wide uppercase">
              Design System Studio
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Projekte</h1>
          <p className="mt-1 text-muted-foreground">
            Definiere Farben, Typografie, Spacing &amp; mehr — und exportiere dein
            Design System als CSS, Tailwind, JSON oder Styleguide.
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger render={<Button size="lg" />}>
            <Plus /> Neues Projekt
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neues Design-System-Projekt</DialogTitle>
            </DialogHeader>
            <Input
              autoFocus
              placeholder="Projektname, z. B. „Kunde Website 2026“"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <DialogFooter>
              <Button onClick={handleCreate}>Projekt anlegen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed p-16 text-center">
          <p className="text-lg font-medium">Noch keine Projekte</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Lege dein erstes Design-System-Projekt an, um loszulegen.
          </p>
          <Button className="mt-6" onClick={() => setCreateOpen(true)}>
            <Plus /> Neues Projekt
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => {
            const scale = generateScale(project.system.colors.primary.light);
            return (
              <Card
                key={project.id}
                className="group cursor-pointer gap-0 overflow-hidden p-0 transition-shadow hover:shadow-md"
                onClick={() => router.push(`/editor?project=${project.id}`)}
              >
                <div className="flex h-20">
                  {(["300", "400", "500", "600", "700"] as const).map((step) => (
                    <div
                      key={step}
                      className="flex-1"
                      style={{ backgroundColor: scale[step] }}
                    />
                  ))}
                </div>
                <CardContent className="px-5 pt-4">
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Zuletzt bearbeitet: {formatDate(project.updatedAt)}
                  </p>
                </CardContent>
                <CardFooter
                  className="justify-end gap-1 px-3 pt-2 pb-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Umbenennen"
                    onClick={() => {
                      setRenameId(project.id);
                      setRenameValue(project.name);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Duplizieren"
                    onClick={() => duplicateProject(project.id)}
                  >
                    <Copy />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Löschen"
                    onClick={() => {
                      if (confirm(`Projekt „${project.name}“ wirklich löschen?`)) {
                        deleteProject(project.id);
                      }
                    }}
                  >
                    <Trash2 />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={renameId !== null} onOpenChange={(open) => !open && setRenameId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Projekt umbenennen</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && renameId) {
                renameProject(renameId, renameValue);
                setRenameId(null);
              }
            }}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                if (renameId) renameProject(renameId, renameValue);
                setRenameId(null);
              }}
            >
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
