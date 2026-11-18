import activity from "@/content/github-activity.json";
import { profile } from "@/content/profile";

export function GitHubHeatmap() {
  const days = [...activity.days].sort((a, b) => a.date.localeCompare(b.date));
  const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, index) => days.slice(index * 7, index * 7 + 7));
  const updated = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(activity.fetchedAt));
  return <div className="showcase-activity-card">
    <div className="showcase-activity-top"><strong>GitHub Activity</strong><span>Snapshot {updated}</span></div>
    <div className="showcase-heatmap-scroll" tabIndex={0} aria-label="Scrollable GitHub contribution calendar"><div className="showcase-heatmap" role="img" aria-label={`GitHub contribution calendar from ${days[0]?.date} to ${days.at(-1)?.date}`}>
      {weeks.map((week, index) => <div className="showcase-heat-week" key={index}>{week.map(day => <span key={day.date} className={`showcase-heat-cell level-${day.level}`} title={`${day.date}: contribution level ${day.level}`} />)}</div>)}
    </div></div>
    <div className="showcase-activity-bottom"><span>Less <i className="level-0"/><i className="level-1"/><i className="level-2"/><i className="level-3"/><i className="level-4"/> More</span><a href={profile.social.github} target="_blank" rel="noopener noreferrer">View full profile ↗</a></div>
  </div>;
}
