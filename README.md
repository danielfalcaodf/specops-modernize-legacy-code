# Modernize Your Legacy Code with GitHub Copilot (SpecOps Edition)

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

> **Note:** This is an adaptation of the [original GitHub Skills lesson](https://github.com/skills/modernize-your-legacy-code-with-github-copilot) that has been modified to demonstrate [SpecOps](https://spec-ops.ai) principles. SpecOps is a methodology for using AI to modernize legacy systems by focusing on **knowledge preservation and verified specifications** rather than direct code translation.

## Welcome

- **Who is this for**: Developers looking to update and improve their legacy codebases using specification-driven development.
- **What you'll learn**: How to leverage GitHub Copilot to extract specifications from legacy code and generate modern implementations from those specifications.
- **What you'll build**: A software specification and a modern Node.js application that implements it.
- **Prerequisites**:
  - Skills exercise: [Getting Started with GitHub Copilot](https://github.com/skills/getting-started-with-github-copilot)
  - Familiarity with [VS Code](https://code.visualstudio.com/)
  - Basic coding principles
- **How long**: This exercise takes less than 30 minutes to complete.

In this exercise, you will:

1. Analyze legacy COBOL code to understand its behavior.
2. **Generate a software specification** that captures business rules in plain language.
3. Create a test plan derived from the specification.
4. **Implement a modern Node.js application from the specification**—not by translating code.
5. Validate the implementation against the specification using tests.

## SpecOps Toolkit

This repository includes standard SpecOps components that you can reuse in your own projects:

| Component | Description |
|-----------|-------------|
| [AGENTS.md](AGENTS.md) | Instructions for AI agents working on this codebase. Encodes the SpecOps methodology—specification-driven development where the spec is the source of truth. Configure this file to guide AI assistants in your own projects. |
| [.github/instructions/cobol.instructions.md](.github/instructions/cobol.instructions.md) | COBOL comprehension instructions that automatically apply when Copilot analyzes `.cob` files. Helps AI understand COBOL structure and extract specifications in plain language. |
| [.github/workflows/spec-change-issues.yml](.github/workflows/spec-change-issues.yml) | GitHub Actions workflow using the [SpecOps Action](https://github.com/spec-ops-method/spec-ops-action) to automatically create issues when specification files are modified. This ensures spec changes generate trackable work items for implementation review. |

### How to start this exercise

Simply copy the exercise to your account, then give your favorite Octocat (Mona) **about 20 seconds** to prepare the first lesson, then **refresh the page**.

[![Start the exercise](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=spec-ops-method&template_name=modernize-your-legacy-code-with-github-copilot&owner=%40me&name=specops-modernize-legacy-code&description=Exercise:+Modernize+Your+Legacy+Code+with+GitHub+Copilot+(SpecOps+Edition)&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend the following settings:

- For owner, choose your personal account or an organization to host the repository.
- We recommend creating a public repository, since private repositories will use Actions minutes.

If the exercise isn't ready in 20 seconds, please check the [Actions](../../actions) tab.

- Check to see if a job is running. Sometimes it simply takes a bit longer.
- If the page shows a failed job, please submit an issue. Nice, you found a bug! 🐛

</details>

---

[MIT License](https://gh.io/mit)

