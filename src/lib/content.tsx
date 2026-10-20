// Renders guide content: blank-line separated paragraphs, "## " headings and "- " bullets.
export function renderContent(text: string) {
  return text.split(/\n\s*\n/).map((block, i) => {
    const lines = block.trim().split("\n");
    if (lines.every((l) => l.startsWith("- "))) {
      return <ul key={i}>{lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}</ul>;
    }
    if (lines[0].startsWith("## ")) {
      const rest = lines.slice(1);
      return (
        <div key={i}>
          <h2>{lines[0].slice(3)}</h2>
          {rest.length > 0 && (rest.every((l) => l.startsWith("- ")) ? <ul>{rest.map((l, j) => <li key={j}>{l.slice(2)}</li>)}</ul> : <p>{rest.join(" ")}</p>)}
        </div>
      );
    }
    return <p key={i}>{lines.join(" ")}</p>;
  });
}
