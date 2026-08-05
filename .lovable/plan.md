## Enable public remixing + handoff steps

### What I'll do in build mode
Public remixing is a project setting, not a code change — I can't toggle it from here. You'll flip it yourself (takes 10 seconds), then follow the handoff steps below.

### Step 1 — Enable public remixing (you do this)
1. Click the project name **"frontera-creds"** in the top-left of the Lovable editor.
2. **Settings** → **Project** section → **General**.
3. Scroll to **Public remixing** → toggle **on**.
4. Copy the project URL from your browser address bar (looks like `https://lovable.dev/projects/d31ec655-...`).

### Step 2 — Galvin remixes into Frontera's workspace
Send him the project URL with these instructions:
1. Log into Lovable with the Frontera email account.
2. Open the URL you sent.
3. Click **Remix** (top-right, or on the project card).
4. Choose the **Frontera workspace** as the destination.
5. He now has an independent copy — full source, all assets, MCP server, consent banner, everything.

### Step 3 — Move the domains to the new project
Once Galvin confirms the remix works and the preview looks right:
1. In **this** project (old): Settings → Domains → remove `fronteracreds.com`, `www.fronteracreds.com`, and (later) `frontera.global`.
2. In **his** project (new): Settings → Domains → add the same domains.
3. Lovable re-verifies DNS automatically — the existing A record (`185.158.133.1`) and TXT record stay valid, so no DNS changes needed at the registrar. SSL re-issues in a few minutes.
4. Republish from his project.

### Step 4 — Retire the old project (optional)
After the domain is live on his side and you've confirmed the site loads correctly, you can either:
- **Archive** this project (keeps it as backup), or
- **Delete** it from Settings → General.

Keep it for ~1 week as a safety net before deleting.

### Things to know
- **Billing/credits do not transfer** — Frontera's workspace uses its own plan and credits from day one.
- **Chat history does not transfer** — the remix is code + assets only. All your past conversations with me stay in this project.
- **Secrets do not transfer** — you don't have any custom secrets set (no Lovable Cloud enabled), so nothing to migrate.
- **MCP endpoint** (`/mcp`) will work identically on the new project once domains move.
- **Happierleads pixel** keeps firing — it's hardcoded in `src/routes/__root.tsx` and travels with the remix.

### Alternative: Transfer instead of Remix
If Galvin's Frontera workspace is on the same billing tier and you'd rather move the project (keeping chat history), you can use **Settings → Project → General → Transfer workspace** instead — but this only works if he's already a member of your current workspace, or you're a member of his. Remix is simpler for a clean handoff between accounts.
