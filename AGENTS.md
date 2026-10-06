# Architecture decisions
- Keep Capabilities, Approach, and Cases as existing homepage section links while Credentials is a dedicated route; this preserves established content and gives campaigns a shareable hub URL.
- Use one validated dynamic therapy-area route and a shared page component; each area gets a distinct URL and metadata without duplicating presentation logic or nesting the hub page.
- Store supplied binary site media as Lovable Assets pointers; this keeps large credentials PDFs out of the source tree.