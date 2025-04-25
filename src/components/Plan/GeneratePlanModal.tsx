'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

export default function GeneratePlanModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          Generate New Plan
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Genereer nieuw trainingsschema</DialogTitle>
          <DialogDescription>
            Vul de velden in en ontvang een gepersonaliseerd plan.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Doelafstand (bijv. 10 km)</label>
            <input
              type="text"
              placeholder="10"
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Aantal weken</label>
            <input
              type="number"
              placeholder="6"
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Niveau</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
              <option>Beginner</option>
              <option>Gemiddeld</option>
              <option>Gevorderd</option>
            </select>
          </div>

          <Button type="submit" className="w-full mt-4">
            Genereer plan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
