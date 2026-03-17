## Step 2: Generate a Software Specification from the Legacy COBOL System

In this step, you'll use GitHub Copilot to analyze the school's legacy COBOL accounting system and generate a **comprehensive software specification**. This specification will become the authoritative source of truth for modernization—capturing institutional knowledge in a format that domain experts can verify before any new code is written.

> [!NOTE]
> **Why Specification-Driven Development?**
>
> Traditional AI-assisted modernization tries to transpile legacy code directly into modern languages. The [SpecOps methodology](https://spec-ops.ai) takes a different approach: use AI to compile institutional knowledge into comprehensive, human-verified software specifications that become the authoritative source of truth for system behavior.
>
> **The specification is more valuable than the code.** It captures institutional knowledge, enables domain expert verification, and outlasts any particular technical implementation.

### ⌨️ Activity: Exploring the School's Legacy Accounting System

Before we can create a specification, we need to understand the existing system.

First, take a few minutes to explore the COBOL files in the repository, you will find them in the `src/cobol` directory.

>[!NOTE]
> COBOL is a legacy language that was widely used in the 1960s and 1970s for business applications. It has a very different syntax and structure compared to modern programming languages.
>
> You may not be familiar with COBOL, but don't worry! GitHub Copilot can help you understand the code and its purpose.


Let's use GitHub Copilot to generate a formal software specification!

1. Open up Copilot Chat window in the sidebar and select **Agent** Mode. You will use it for the rest of the exercise.
1. Click **Add Context...** in the Copilot Chat sidebar, select **Files & Folders** then select the `src/` directory. This will put the COBOL files in the prompt context so Copilot will be sure what files you are referring to in the following prompt.

1. Let's ask Copilot in Agent mode to generate a **comprehensive software specification** that captures the system's behavior in plain language:

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Analyze the COBOL files and create a comprehensive software specification in a new file: docs/SPECIFICATION.md
   >
   > The specification should be written in plain language that a school administrator (not a programmer) could understand and verify. Include:
   >
   > 1. **System Overview**: A brief description of what the system does and who uses it
   > 2. **Data Structures**: Document all data elements, their types, constraints, and default values
   > 3. **Business Rules**: Document all business logic rules (e.g., "A debit cannot exceed the current balance")
   > 4. **Operations**: For each operation (view balance, credit, debit), describe:
   >    - Purpose
   >    - Required inputs
   >    - Expected outputs
   >    - Step-by-step behavior
   >    - Error conditions and handling
   > 5. **User Interface Flow**: Document the menu structure and user interaction flow
   >
   > This specification will be used as the authoritative source of truth for building a modern replacement system.
   > ```

   > 💡 **Tip:** Creating good prompts is a combination of proper context, clarity and specificity. Learn more about [Prompt Engineering](https://docs.github.com/en/copilot/concepts/prompt-engineering-for-copilot-chat).

> [!IMPORTANT]
> **Domain Expert Verification**
>
> In a real-world SpecOps engagement, this specification would be reviewed and verified by domain experts—school administrators, accountants, or policy stakeholders—before proceeding. They understand the business requirements better than any code can express. For this exercise, take a moment to review the specification yourself and ensure it accurately captures the system's behavior.


<details>
<summary>Having trouble? 🤷</summary><br/>

- COBOL is a column-sensitive language. The code is organized in divisions (IDENTIFICATION, DATA, PROCEDURE) and sections.
- The `main.cob` file handles the user interface and menu options (view student balance, process payment, record purchase, exit)
- The `operations.cob` file contains the logic for different student account operations
- The `data.cob` file manages the storage of student account balances

</details>

### ⌨️ Activity: Add a data flow diagram to the specification

Now that you have a formal specification, let's enhance it with a visual representation of how data flows through the system. Diagrams make specifications more accessible to non-technical stakeholders.

>[!NOTE]
> Notice how we are breaking down the task into smaller steps.
>
> You will find that Copilot is more effective when you provide it with specific smaller tasks rather than trying to do everything at once, e.g `Hey Copilot, refactor this COBOL codebase to Node.js`.
>
> This is especially true when working on large codebase modernizations and context window limitations come into play.

Let's add a data flow diagram to our specification!

1. Ask Copilot to create a Mermaid sequence diagram that illustrates how data moves through the school's accounting system.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Create a sequence diagram showing the data flow for each operation in the accounting system.
   >
   > Please create this in Mermaid format and append it to the docs/SPECIFICATION.md file under a new section called "System Diagrams".
   > ```

1. Make sure you can preview the diagram in the `docs/SPECIFICATION.md` file.

1. In the left sidebar, select the `Source Control` tab and make sure you are making changes on `modernize-legacy-code`branch.

   > 💡 **Tip:** Opening a file from the source control area will show the differences to the original rather than simply opening it.

1. Find the `docs/SPECIFICATION.md` file and press the `+` sign to collect your changes together in the staging area.

1. Above the list of staged changes, find the **Message** text box, but **don't enter anything** for now.

   - Typically, you would write a short description of the changes here, but now we have Copilot to help out!

1. To the right of the **Message** text box, find and click the **Generate Commit Message with Copilot** button (sparkles icon).

1. Press the **Commit** button and **Sync Changes** button to push your changes to the `modernize-legacy-code`branch on GitHub.

1. Wait a moment for Mona to check your work, provide feedback, and share the next lesson.

<details>
<summary>Having trouble? 🤷</summary><br/>

If you don't get feedback, here are some things to check:

- Make sure your pushed the `docs/SPECIFICATION.md` file changes to the branch `modernize-legacy-code`.

</details>
