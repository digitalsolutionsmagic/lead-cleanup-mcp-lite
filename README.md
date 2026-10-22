# Lead Cleanup MCP Lite

A free, minimal [Model Context Protocol](https://modelcontextprotocol.io) server that cleans and de-duplicates sales lead lists. It runs locally, needs **no API keys**, and makes no network calls.

## Tools

| Tool | What it does |
| --- | --- |
| `clean_leads` | Takes a list of leads (`name`, `email`, `phone`, `company`, `website`). Normalizes names, emails, phone numbers and website domains, drops leads with invalid emails, and removes duplicates by email. Returns the cleaned list plus counts. |
| `validate_email` | Checks whether an email address has a valid format (no network lookup). |

## Install

Requires Node.js 18 or newer.

```bash
git clone https://github.com/digitalsolutionsmagic/lead-cleanup-mcp-lite.git
cd lead-cleanup-mcp-lite
npm install
npm run sample   # runs the cleaning logic on examples/sample-leads.json
```

## Add to an MCP client

Example config for Claude Desktop or any client that uses an `mcpServers` block (replace the path with your own):

```json
{
  "mcpServers": {
    "lead-cleanup-lite": {
      "command": "node",
      "args": ["/full/path/to/lead-cleanup-mcp-lite/src/index.js"]
    }
  }
}
```

## Example

Input (`examples/sample-leads.json`) has three rows: one messy valid lead, a duplicate of it, and one with an invalid email. Output:

```json
{
  "cleaned": [
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "phone": "5551234567",
      "company": "Acme Inc",
      "website": "acme.com"
    }
  ],
  "stats": { "input": 3, "kept": 1, "invalid_email": 1, "duplicates": 1 }
}
```

## Full version

This Lite version covers cleanup only. The full **Lead Enrichment & Cleanup MCP Skill** adds AI-powered lead enrichment using Gemini and is available on the author's store:

https://www.getly.store/store/ai-magic-mvh6ijc8

## License

MIT. See [LICENSE](LICENSE).
