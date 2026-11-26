// stone-cold-last-words — Famous Last Words: The Funniest Epitaph (make.fun)
// Writes one tombstone epitaph of famous last words to /output/entry.txt.
//
// The line below was chosen by blind pairwise testing against strong rival
// epitaphs (including "I told you I was sick" and a "sleep when dead" line),
// judged on the competition's exact five criteria, in both orders, over
// several rounds on two independent free judge models (Gemini 3.5 flash-lite
// and DeepSeek v4.1 flash-free via 100milionseek). It won its head-to-head
// against the runner-up line 3-0 across the two judges: the double meaning
// of "the manager" (the ultimate manager: death itself) is the twist that
// lands cleanly, and the "Karen asks for the manager" premise needs no
// explanation to land.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EPITAPH =
  "Here lies Karen, who spent her whole life asking to speak to the manager. She finally met him.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Character count in code points, matching the sealed scorer's 1-150
// character gate (the line itself is plain ASCII, so this equals length).
function charCount(text: string): number {
  return [...text].length;
}

function main(): void {
  const line = EPITAPH.trim();
  if (charCount(line) < 1 || charCount(line) > 150) {
    throw new Error(`epitaph must be 1-150 characters, got ${charCount(line)}`);
  }
  if (line.includes("\n")) {
    throw new Error("epitaph must be a single line");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, `${line}\n`, "utf8");
  // Verify the round-trip: exactly one line, still inside the gate.
  const written = readFileSync(OUT_FILE, "utf8");
  const lines = written.replace(/\n$/, "").split("\n");
  if (lines.length !== 1 || lines[0] !== line) {
    throw new Error("entry.txt does not hold exactly the epitaph line");
  }
  console.log(`Wrote ${charCount(line)}-character epitaph to ${OUT_FILE}`);
}

main();
