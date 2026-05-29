import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import CalendarExportButtons from "../components/CalendarExportButtons";
import academicCalendar from "../data/academicCalendar.json";
import { CalendarDays, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const CATEGORY_LABELS = {
  Timetable: "Timetable",
  MoM: "Minutes of Meeting",
  FDP: "FDP / STTP",
  Deadline: "Deadlines",
};

function summarize(events) {
  const byCategory = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  return {
    total: events.length,
    nextEvent: [...events]
      .sort(
        (first, second) =>
          dayjs(first.start).valueOf() - dayjs(second.start).valueOf(),
      )
      .find((event) => dayjs(event.start).isAfter(dayjs().subtract(1, "day"))),
    timetable: byCategory.Timetable || 0,
    mom: byCategory.MoM || 0,
    fdp: byCategory.FDP || 0,
    deadline: byCategory.Deadline || 0,
  };
}

function CalendarItemCard({ event }) {
  const isPast = dayjs(event.end).isBefore(dayjs(), "minute");

  return (
    <Card className="overflow-hidden border border-[var(--color-border)] bg-white shadow-sm">
      <CardContent className="p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="default"
                className="border-[var(--color-border)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
              >
                {CATEGORY_LABELS[event.category] ?? event.category}
              </Badge>
              <Badge
                variant="default"
                className={
                  isPast
                    ? "bg-[var(--color-surface-soft)] text-[var(--color-text-soft)]"
                    : "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                }
              >
                {isPast ? "Archived" : "Upcoming"}
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {event.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                {event.notes}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["When", dayjs(event.start).format("DD MMM YYYY, hh:mm A")],
                ["Until", dayjs(event.end).format("DD MMM YYYY, hh:mm A")],
                ["Audience", event.audience],
                ["Mode", event.mode],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/60 px-4 py-3"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-sm rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(10,10,10,0.96),rgba(10,10,10,0.88))] p-5 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Calendar export
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <p>{event.division}</p>
              <p>{event.batch}</p>
              <p>{event.location}</p>
            </div>
            <div className="mt-6">
              <CalendarExportButtons event={event} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TimeTable() {
  const [category, setCategory] = useState("Timetable");
  const [division, setDivision] = useState("All");
  const [batch, setBatch] = useState("All");

  const filters = useMemo(() => {
    const divisions = Array.from(
      new Set(academicCalendar.map((event) => event.division)),
    ).sort();
    const batches = Array.from(
      new Set(academicCalendar.map((event) => event.batch)),
    ).sort();

    return { divisions, batches };
  }, []);

  const visibleEvents = useMemo(() => {
    return academicCalendar
      .filter((event) => event.category === category)
      .filter((event) => division === "All" || event.division === division)
      .filter((event) => batch === "All" || event.batch === batch)
      .sort(
        (first, second) =>
          dayjs(first.start).valueOf() - dayjs(second.start).valueOf(),
      );
  }, [batch, category, division]);

  const summary = useMemo(() => summarize(academicCalendar), []);
  const nextExportItem = summary.nextEvent || academicCalendar[0];

  return (
    <div className="space-y-12 pb-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)]">
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
        <div className="relative grid gap-10 px-8 py-12 lg:grid-cols-[1.2fr,0.8fr] lg:px-12 lg:py-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="type"
                className="bg-[var(--color-primary)] px-4 py-1.5 text-white"
              >
                Academic Calendar Hub
              </Badge>
              <Badge
                variant="default"
                className="border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-1.5 text-[var(--color-text)]"
              >
                ICS + Google Calendar export
              </Badge>
            </div>

            <h1 className="mt-8 max-w-3xl font-[var(--font-serif)] text-5xl font-black leading-[1.08] tracking-tight text-[var(--color-heading)] md:text-6xl">
              Timetable, MoM, FDPs and deadlines in one calendar-native
              workflow.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[var(--color-text-soft)]">
              Filter departmental events by division, batch or category, then
              export any item directly to ICS or Google Calendar.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Total events", summary.total],
                ["Timetable slots", summary.timetable],
                ["MoM archives", summary.mom],
                ["Deadlines", summary.deadline],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-5 py-4"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    {label}
                  </p>
                  <p className="mt-2 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-none bg-[var(--color-surface-soft)] shadow-inner">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 text-[var(--color-accent)]">
                <CalendarDays size={22} />
                <h2 className="text-xl font-bold font-[var(--font-serif)] text-[var(--color-heading)]">
                  Next export-ready item
                </h2>
              </div>

              <div className="mt-6 rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Upcoming
                </p>
                <h3 className="mt-3 text-2xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                  {nextExportItem.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                  {nextExportItem.notes}
                </p>

                <div className="mt-4 space-y-2 text-sm text-[var(--color-text-soft)]">
                  <p>
                    {dayjs(nextExportItem.start).format("DD MMM YYYY, hh:mm A")}
                  </p>
                  <p>{nextExportItem.location}</p>
                  <p>{nextExportItem.audience}</p>
                </div>

                <div className="mt-6">
                  <CalendarExportButtons event={nextExportItem} />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                    Current view
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                    {CATEGORY_LABELS[category]}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                    Active filters
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                    {division === "All" ? "All divisions" : division} ·{" "}
                    {batch === "All" ? "All batches" : batch}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Filter size={20} />
            </div>
            <div>
              <p className="text-base font-bold text-[var(--color-heading)]">
                Workflow filters
              </p>
              <p className="text-sm text-[var(--color-text-soft)]">
                Switch between timetable, governance, FDP and deadline records.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(CATEGORY_LABELS).map((item) => (
              <Button
                key={item}
                type="button"
                variant={category === item ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(item)}
              >
                {CATEGORY_LABELS[item]}
              </Button>
            ))}
          </div>
        </div>

        {category === "Timetable" ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
                Division
              </span>
              <Select value={division} onValueChange={setDivision}>
                <SelectTrigger>
                  <SelectValue placeholder="All divisions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All divisions</SelectItem>
                  {filters.divisions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
                Batch
              </span>
              <Select value={batch} onValueChange={setBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="All batches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All batches</SelectItem>
                  {filters.batches.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Filtered results
            </p>
            <h2 className="mt-2 text-2xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
              {CATEGORY_LABELS[category]}
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-soft)]">
            {visibleEvents.length} item{visibleEvents.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="space-y-4">
          {visibleEvents.map((event) => (
            <CalendarItemCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
