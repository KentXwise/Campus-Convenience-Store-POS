# Four Stage Prompt Cycle

Run the cycle once per focused unit of work: initial cart flow, payment validation, receipt generation, a bug fix, or final review. Do not use a single oversized prompt to implement the entire project without checkpoints.

## Stage 1 Assess

Capture the requirement, affected files, current behavior, assumptions, and success checks before editing.

Prompt pattern:

> In the IT 415 Campus Convenience Store POS project, assess the requirement to [feature or issue]. Inspect the relevant files and give a minimal plan, the acceptance checks, and any assumptions. Do not edit files yet.

Evidence to keep: requirement addressed, plan, and acceptance checks.

## Stage 2 Implement

Request only the smallest necessary implementation. Require a plain-language explanation of the logic.

Prompt pattern:

> Implement [specific feature] in the Campus Convenience Store POS. Keep the change minimal, preserve existing working behavior, and explain how the changed logic works. The feature must satisfy: [acceptance checks].

Evidence to keep: exact prompt, response summary, affected files, and any manual corrections.

## Stage 3 Verify

Test both expected and failure paths. For payment work, include valid, blank, non-numeric, negative, and insufficient amounts. For cart work, include quantity changes, removal, and recalculated totals.

Prompt pattern:

> Verify [feature] against these checks: [checks]. Report the test inputs, expected results, actual results, and any defect found. If there is a defect, propose the smallest correction.

Evidence to keep: test cases, observed results, fixes, and remaining limitations.

## Stage 4 Document

Turn genuine work from the first three stages into a documentation-form entry and identify the appropriate Git milestone. Do not fabricate a prompt, response, evaluation, screenshot, or commit.

Prompt pattern:

> Using this genuine AI interaction and verification evidence, draft an IT 415 AI Prompt Record entry with the exact prompt, purpose, brief response summary, evaluation, modifications, and test outcome. Also suggest the applicable Git milestone; do not create a commit.

Evidence to keep: completed prompt record and the user-approved commit message if a commit is made.

## Suggested cycle order

1. Basic product interface and cart.
2. Totals, quantity controls, removal, and cash validation.
3. Payment confirmation, digital receipt, new transaction, and error-path review.
4. Final submission audit and evidence gathering.
