#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { cleanLeads, isValidEmail } from "./lib.js";

const server = new McpServer({ name: "lead-cleanup-mcp-lite", version: "0.1.0" });

const leadShape = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
});

server.tool(
  "clean_leads",
  "Clean a list of sales leads: normalize names, emails, phones and websites, drop invalid emails and remove duplicates.",
  { leads: z.array(leadShape).min(1).max(5000) },
  async ({ leads }) => {
    const result = cleanLeads(leads);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "validate_email",
  "Check whether an email address has a valid format (no network lookup).",
  { email: z.string() },
  async ({ email }) => ({
    content: [{ type: "text", text: JSON.stringify({ email, valid: isValidEmail(email) }) }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
