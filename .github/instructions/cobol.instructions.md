---
applyTo: "**/*.cob"
---

# COBOL Comprehension Instructions

When analyzing COBOL code in this workspace, use these instructions to understand its structure, business logic, and data flow.

## COBOL Structure
- **IDENTIFICATION DIVISION**: Program metadata (PROGRAM-ID)
- **DATA DIVISION**: Variable declarations in WORKING-STORAGE and LINKAGE sections
- **PROCEDURE DIVISION**: Business logic and program flow

## Key Patterns to Identify
1. **Data definitions**: PIC clauses define data types (9 = numeric, X = alphanumeric, V = decimal point)
2. **Program calls**: CALL statements indicate inter-program communication
3. **Control flow**: PERFORM, EVALUATE, IF/ELSE structures
4. **Data operations**: MOVE, ADD, SUBTRACT, MULTIPLY, DIVIDE

## Analysis Approach
When asked to explain COBOL code:
1. Identify the program's purpose from PROGRAM-ID and overall structure
2. Document all data elements and their constraints
3. Trace the business logic in PROCEDURE DIVISION
4. Note any inter-program dependencies (CALL statements)
5. Identify business rules embedded in conditional logic

## Output for SpecOps
When extracting specifications from COBOL, produce plain-language descriptions that:
- A non-programmer domain expert could verify
- Capture business rules, not implementation details
- Document edge cases and error handling
- Note any implicit assumptions in the code
