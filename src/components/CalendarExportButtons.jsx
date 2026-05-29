import { Button } from "./ui/button";
import {
  createGoogleCalendarUrl,
  createIcsContent,
  downloadTextFile,
} from "../lib/documentIntelligence";

export default function CalendarExportButtons({ event }) {
  const handleIcsDownload = () => {
    const filename = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
    downloadTextFile(filename, createIcsContent(event));
  };

  const googleCalendarUrl = createGoogleCalendarUrl(event);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="soft"
        size="sm"
        onClick={handleIcsDownload}
      >
        Download ICS
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => window.open(googleCalendarUrl, "_blank", "noreferrer")}
      >
        Add to Google Calendar
      </Button>
    </div>
  );
}
