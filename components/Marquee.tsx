import { skillGroups } from "@/data/swati";
import { TechIcon, hasTechIcon } from "./TechIcon";

const Diamond = () => <span className="diamond" aria-hidden="true" />;

/** A slow band of the tools Swati works with. Duplicated once so the loop is seamless. */
export function ToolMarquee() {
  const items = skillGroups.flatMap((g) => g.items).filter(hasTechIcon);
  const row = (copy: number) => (
    <ul className="marquee-row" aria-hidden={copy > 0 ? true : undefined}>
      {items.map((t) => (
        <li key={`${copy}-${t}`} className="marquee-item">
          <TechIcon name={t} size={18} />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee marquee-tools" aria-label="Tools I work with">
      <div className="marquee-track">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}

/** Large outlined words that scroll across the top of the closing section. */
export function WordMarquee({ words }: { words: string[] }) {
  const row = (copy: number) => (
    <div className="marquee-row" aria-hidden="true">
      {words.map((w, i) => (
        <span key={`${copy}-${i}`} className="marquee-word">
          <span className={i % 2 ? "solid" : "outline"}>{w}</span>
          <Diamond />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee marquee-words">
      <p className="sr-only">{words.join(", ")}</p>
      <div className="marquee-track slow">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
