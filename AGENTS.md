# SpecOps Agent Instructions

This file provides instructions for AI agents working on this codebase. It encodes the SpecOps methodology—a specification-driven approach to software development and legacy system modernization.

## Core Principle

**The specification is the source of truth.** All code implements behavior defined in specifications. When in doubt, defer to the spec. If the spec is unclear or incomplete, flag it for human review rather than making assumptions.

## The SpecOps Workflow

### Specification First

1. **Read specifications before code.** Before implementing, modifying, or analyzing any feature, locate and read the relevant specification in the `specifications/` directory.
2. **Propose spec changes before code changes.** If implementation requires behavior not covered by a specification, draft a specification update for human review before writing code.
3. **Never implement undocumented behavior.** All system behavior must trace back to a verified specification.

### Human Verification

4. **Domain experts verify specifications, not code.** Specifications are written in plain language so non-technical stakeholders can review them. Code is an implementation detail.
5. **Flag ambiguity for human review.** When specifications contain ambiguous requirements, edge cases without clear guidance, or apparent contradictions, stop and request clarification rather than interpreting.
6. **Preserve institutional knowledge.** When you encounter implicit business rules, policy interpretations, or undocumented edge cases in existing code, extract them into specification language for human verification.

## Working with Specifications

### Reading Specifications

- Specifications are located in `specifications/` (adjust path as needed for your project)
- Each specification documents what the system *should do*, independent of implementation
- Specifications include requirements, acceptance criteria, edge cases, and references to governing rules (statutes, regulations, policies)

### Specification Format

Specifications in this project follow this structure:

```markdown
# [Feature/Component Name] Specification

## Purpose
Brief description of what this component does and why it exists.

## Requirements

### Requirement: [Requirement Name]
The system SHALL [behavior description].

#### Acceptance Criteria
- GIVEN [precondition]
- WHEN [action]
- THEN [expected outcome]

#### Edge Cases
- [Edge case description and expected handling]

## References
- [Link to governing statute, regulation, or policy]
- [Link to related specifications]
```

### Updating Specifications

When proposing specification changes:

1. **Document the change clearly.** Show what is being added, modified, or removed.
2. **Explain the rationale.** Why is this change needed? What requirement, bug, or policy change drives it?
3. **Identify affected code.** List components that will need implementation changes.
4. **Request human review.** Specification changes require domain expert approval before implementation proceeds.

## Working with Code

### Before Writing Code

1. Identify the governing specification for the feature
2. Confirm the specification covers the behavior you're implementing
3. If not covered, draft a specification update first

### While Writing Code

4. Reference specification requirements in code comments where helpful
5. Name functions, variables, and modules to align with specification terminology
6. Implement exactly what the specification requires—no more, no less

### After Writing Code

7. Verify implementation matches all acceptance criteria
8. Document any implementation decisions that aren't obvious from the spec
9. If implementation revealed spec gaps, note them for future spec updates

## Extracting Specifications from Legacy Code

When analyzing existing code to generate specifications:

### Analysis Approach

1. **Identify business logic.** Distinguish business rules from infrastructure, error handling, and technical implementation details.
2. **Trace to authoritative sources.** Look for references to statutes, regulations, form numbers, or policy documents in comments or naming.
3. **Document edge cases.** Pay special attention to conditional logic, boundary conditions, and error handling—these often encode important business rules.
4. **Preserve original intent.** Capture what the code *does*, not what you think it *should* do. Specification review will determine correctness.

### Output Format

Generate specifications that:

- Use plain language a domain expert can verify
- Include all requirements with acceptance criteria
- Document edge cases and boundary conditions
- Reference governing rules (IRC sections, regulations, policies)
- Note any ambiguities or areas needing clarification

### What to Flag for Human Review

- Contradictory logic paths
- Undocumented magic numbers or thresholds
- Business rules with no apparent authoritative source
- Dead code that may represent deprecated requirements
- Assumptions you made during analysis

## Project-Specific Instructions

### Specification Location
- Primary specification: `docs/SPECIFICATION.md`
- Test plan (derived from specification): `docs/TESTPLAN.md`
- Legacy COBOL code (for analysis only): `src/cobol/`

### Domain Context
- This system implements a school accounting system for managing student accounts
- Operations include: viewing balance, crediting accounts, debiting accounts
- Key business rule: Debits cannot exceed current balance

### Code Conventions
- The specification is the authoritative source of truth for system behavior
- The Node.js implementation in `src/accounting/` implements the specification
- Test files reference scenarios from `docs/TESTPLAN.md`

### Review Process
- Specification changes trigger automatic issue creation via the SpecOps GitHub Action
- Use label `spec-change` for specification-related work
- Implementation PRs must reference the governing specification

## CI/CD Integration

When developing or implementing CI/CD workflows for this project, consider adding automation to enforce the SpecOps methodology:

### Recommended: Spec Change Issue Creator

The [SpecOps GitHub Action](https://github.com/spec-ops-method/spec-ops-action) automatically creates issues when specification files are modified, ensuring that spec changes generate trackable work items for implementation review.

```yaml
- uses: spec-ops-method/spec-ops-action@v1
  with:
    file-pattern: 'specifications/**/*.md'
    labels: 'spec-change'
```

This reinforces the spec-first workflow by:
- Creating an issue for each specification change with the diff
- Making spec changes visible and trackable
- Ensuring implementation work flows from documented spec changes

### Alternative Approaches

If the GitHub Action doesn't fit your workflow, consider other mechanisms that enforce the same principle—spec changes should generate visible, trackable work items:

- Branch protection rules requiring spec review
- Custom CI checks that flag code changes without corresponding spec updates
- PR templates that prompt for specification references

The goal is ensuring that specification changes don't get lost and that implementation follows documented requirements.

## Skills and Instruction Sets

This project may include reusable AI agent instruction sets (skills) for specific domains:

- Skills are located in `skills/` (if present)
- Load relevant skills before working on domain-specific tasks
- Skills extend these base instructions with specialized knowledge

## References

- [SpecOps Methodology](https://spec-ops.ai)
- [SpecOps Repository](https://github.com/mheadd/spec-ops)
- [GitHub spec-kit](https://github.com/github/spec-kit)