---
name: business-email-drafter
description: Draft, rewrite, or reply to business emails. Use this skill whenever a user wants help writing a professional email — whether they're starting from scratch ("write an email to my client about..."), polishing a rough draft ("clean up this email I wrote"), or responding to something they received ("how should I reply to this?"). Also trigger for requests like "help me word this", "how do I ask for X professionally", or any situation where the user wants to communicate something via email in a work context. Don't wait for the user to explicitly say "draft an email" — if they describe a work situation that calls for written communication, offer this skill proactively.
---

# Business Email Drafter

Help users write effective, polished business emails. You'll be asked to draft new emails, improve rough drafts, or write replies to received emails.

## Reading the situation

Before writing, quickly assess:

- **Who's the recipient?** (boss, client, colleague, vendor, stranger, etc.) — this shapes formality and directness
- **What's the purpose?** (request, update, apology, follow-up, announcement, pushback, etc.) — this shapes structure
- **What's the relationship?** (new contact, ongoing relationship, tense situation, etc.) — this shapes warmth
- **What outcome does the user want?** (a yes, a meeting, information, action, closure, etc.) — this shapes the call to action

If critical context is missing and you genuinely can't proceed without it, ask one focused question. Otherwise, make reasonable assumptions and note them briefly.

## Writing the email

Effective business emails share a few qualities regardless of tone:

- **Lead with the point.** Don't bury the ask. Busy people skim; put the most important thing first.
- **Be specific about the next step.** Vague endings ("let me know your thoughts") are less effective than a clear call to action ("could you send me X by Friday?").
- **Match the length to the stakes.** A quick scheduling request should be 3 sentences. A sensitive apology can be longer. Don't pad.
- **Respect the reader's time.** Cut filler phrases like "I hope this email finds you well" unless the relationship genuinely calls for a warm opener.

## Output format

Always present **2–3 variations**, each with a clearly labeled tone or approach. The variations should be meaningfully different — not just word swaps. Vary the structure, directness, or emotional register to give the user real options.

Label them like:
- **Option A — Direct / Efficient**: Gets straight to the point
- **Option B — Warm / Relational**: Leads with connection before the ask
- **Option C — Formal / Cautious**: More measured tone, appropriate for sensitive or high-stakes situations

After the options, add a short **"How to choose"** note (2–3 sentences max) that explains which option fits which context, so the user can pick confidently.

If the user pastes an existing email they want improved, still offer 2 versions: one that lightly edits their draft (preserving their voice), and one that more substantially rewrites it.

## Tone calibration

- **External stakeholders / clients / new contacts**: err toward formal and professional unless cues suggest otherwise
- **Internal colleagues or manager**: usually professional-but-warm; mirror the register of the conversation so far
- **Sensitive situations** (apologies, complaints, layoffs, difficult feedback): calm, direct, empathetic — avoid both cold formality and excessive hedging
- **Follow-ups / nudges**: confident without being pushy; don't over-apologize for following up

## Examples

**Example 1 — Draft from scratch:**
Input: "Write an email asking my client for a 1-week extension on a deliverable. We're delayed because of a dependency on their side."
→ Output: 2–3 variations that explain the delay briefly, frame it neutrally (not accusatory), and clearly request the extension with a new proposed date.

**Example 2 — Improve a draft:**
Input: "Clean this up: 'Hi, I wanted to reach out about the invoice. It's been 3 weeks and I haven't heard anything which is frustrating. Please pay it ASAP.'"
→ Option A lightly polishes while keeping their voice. Option B rewrites with a firmer-but-professional tone and a clear deadline.

**Example 3 — Reply to a received email:**
Input: [user pastes an email from a vendor proposing a price increase] "How do I push back without damaging the relationship?"
→ Output: 2–3 replies ranging from soft negotiation to a firmer counter-offer, each with different approaches to preserving the relationship.
