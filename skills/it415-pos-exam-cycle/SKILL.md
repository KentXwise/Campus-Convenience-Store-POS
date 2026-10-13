---
name: it415-pos-exam-cycle
description: "Build and document the IT 415 Campus Convenience Store POS practical-exam project through a four-stage AI prompt cycle. Use for this assignment's implementation, testing, AI records, Git evidence, and submission readiness; not for unrelated POS systems."
---

# IT 415 POS Exam Cycle

Use this skill for the IT 415 practical examination project in this workspace. Keep work within the assigned Campus Convenience Store POS scenario unless the student explicitly changes the scenario. Prioritize a simple, working, explainable application over optional enhancements.

## Four-stage prompt cycle

For every meaningful unit of work, follow these four stages in order. Complete all four before starting the next unit, unless a failure requires returning to Stage 2.

1. **Assess**: identify the exact requirement, current behavior, affected files, and acceptance checks. State a narrowly scoped implementation plan.
2. **Implement**: make the smallest change that satisfies the requirement. Explain the important code or logic so the student can understand it.
3. **Verify**: exercise normal and error paths, compare results with the acceptance checks, and fix defects. Do not claim success without evidence.
4. **Document**: record the exact AI prompt, purpose, response summary, evaluation, modifications, test outcome, and a suitable Git milestone. Keep the user in control of actual commits and pushes.

Read [four-stage-cycle.md](references/four-stage-cycle.md) at the start of implementation work; use its prompt templates and evidence format. Read [requirements.md](references/requirements.md) before building or changing POS functionality. Read [ai-documentation.md](references/ai-documentation.md) when creating the submission records. Read [submission-checklist.md](references/submission-checklist.md) before declaring the project ready to submit.

## Working rules

- Use the required products and Philippine-peso prices from the assigned scenario. Keep at least five products.
- Preserve the prescribed transaction flow: browse, add and adjust cart, review, enter cash, validate and compute change, confirm, receipt, then new transaction.
- Handle blank, non-numeric, negative, and insufficient payments with clear messages. A valid payment must produce correct change.
- Keep state simple and local unless the student asks otherwise. Authentication, inventory, databases, and real payment integrations are out of scope.
- Treat AI output as a proposal: inspect it, test it, and describe any changes before using it. Never invent AI-use records, test results, screenshots, or Git evidence.
- Make AI records reflect genuine prompts and responses from the current work. At least two separate records must cover different development points.
- Suggest logical milestone commits, but only run Git mutations when the student requests them or they are otherwise authorized.

## Completion standard

The application is ready only when one complete transaction and relevant invalid-payment cases have been verified, the required receipt details are present, the evidence checklist is complete, and the student can explain the main code paths.
