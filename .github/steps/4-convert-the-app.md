## Step 4: Implement the Modern Application from the Specification

Perfect! Now that we've generated a comprehensive software specification and prepared our test plan, we have everything we need to implement a modern Node.js application.

> [!IMPORTANT]
> **Specification-Driven Implementation**
>
> Notice that we are **not** asking Copilot to "translate" or "convert" the COBOL code. Instead, we're asking it to **implement the specification**. This is a key SpecOps principle: the specification is the source of truth, not the legacy code. The COBOL code was just a means to extract the specification—now we can discard it and build fresh from verified requirements.

The specification captures what the system should do. The test plan ensures we validate the implementation. With this foundation, GitHub Copilot can generate a clean, modern implementation that faithfully implements the documented behavior.

### ⌨️ Activity: Implement the Specification in Node.js

Let's use GitHub Copilot to implement our verified specification as a modern Node.js application. Rather than translating COBOL syntax, Copilot will read the specification and build a clean implementation from scratch.

>[!NOTE]
>It is still important to be specific and clear in your prompt to ensure Copilot does exactly what you need!

1. Open your Copilot Chat window and make sure you are using **Agent Mode**.
1. Add the specification file as context: Click **Add Context...**, select **Files & Folders**, then select `docs/SPECIFICATION.md`.
1. Provide the following prompt to Copilot to implement the specification:

    > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
    >
    > ```prompt
    > Using the software specification in docs/SPECIFICATION.md as the authoritative source of truth, implement a Node.js application in src/accounting/index.js.
    >
    > The implementation must:
    > - Implement ALL business rules documented in the specification
    > - Follow the data structures and constraints defined in the specification
    > - Reproduce the user interface flow described in the specification
    > - Handle all error conditions as specified
    >
    > Do NOT reference or translate the COBOL code—implement purely from the specification.
    >
    > Change directory to src/accounting and install all prerequisites to run the Node.js application.
    >
    > Create a .vscode/launch.json file to run the Node.js application.
    > ```

1. Ensure the Node.js application is created in the `src/accounting` directory and that you can run it from the `Run and Debug` sidebar in VS Code.
     <!--- TODO add screenshot -->

1. Make sure the application works the same as the original COBOL application.

### ⌨️ Activity: Create Unit Tests Based on Our Test Plan

Let's use the test plan we generated earlier as the blueprint for creating comprehensive unit tests. This ensures our implementation faithfully follows the specification.

Since we already have a detailed test plan in `docs/TESTPLAN.md` (derived from the specification), GitHub Copilot can use that as context to create matching unit tests for our new Node.js implementation.

1. Open your Copilot Chat window and make sure you are using **Agent Mode**.
1. Attach the `docs/TESTPLAN.md` file to the chat so Copilot can use it as context.
1. Provide the following prompt to Copilot to generate unit tests:
    > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
    >
    > ```prompt
    > #codebase change directory to src/accounting and install all prerequisites for the test framework.
    >
    > - Write unit tests for the Node.js application that mirror the scenarios in the testplan.
    > - Place the tests in a dedicated test file.
    > - Make sure each test checks the expected behavior described in the COBOL test plan.
    > ```

1. Copilot Agent Mode should generate unit tests and make sure they run. With its self-healing capabilities, Copilot should automatically fix any issues that arise during the test generation process.
   > If there are any issues, you can continue chatting with Copilot to refine the tests until they are passing and you are satisfied with the results.

### ⌨️ Activity: Final checks and commit your changes

You're almost done! Now let's verify that our Node.js application works exactly like the original COBOL system.

Take a moment to run the application and test suite yourself to ensure everything is functioning as expected.

1. You can use Copilot chat to help with this process.

    > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
    >
    > ```prompt
    > Run the Node.js application and run the test suite and verify tests pass.
    > ```

1. Commit the changes to the `src/accounting` directory and push to the `modernize-legacy-code` branch.

   > 💡 **Tip:** You can use the source control side panel like you did in the previous steps!

<details>
<summary>Having trouble? 🤷</summary><br/>

If you don't get feedback, here are some things to check:

- Make sure your pushed the `src/accounting/*` changes to the branch `modernize-legacy-code`.

</details>

### :keyboard: Activity: Create a pull request and merge

Not much left! Let's create a pull request and merge our changes to `main`.

1. In the web browser, navigate to your repository.
1. At the top click on the **Pull requests** tab. Notice the banner suggesting to create a pull request.
1. In the top right, press the green **Compare & pull request** button.
1. On the **Open a pull request** page, enter the following options:

   - For the **base** branch, select `main`.
   - For the **compare** branch, select the `modernize-legacy-code` branch.
   - For the **add a title** field, enter `Modernize my legacy COBOL application to Node.js`.
   - For the **add a description** field, click the Copilot button and select summary to have one generated. [GitHub Copilot pull request summary docs](https://docs.github.com/en/enterprise-cloud@latest/copilot/using-github-copilot/using-github-copilot-for-pull-requests/creating-a-pull-request-summary-with-github-copilot)
   - Alternately, you write your own such as:

     ```md
     Modernize my legacy COBOL application to Node.js with an explanation of the COBOL code and a test plan.
     This pull request converts the COBOL application to a Node.js application, preserving the original business logic and functionality.
     It also includes unit tests based on the test plan.
     ```

   > ✨ **Bonus:** If your Copilot subscription provides it, you can also use a specialized version of Copilot to [review the changes](https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review?tool=webui).
   > This feature is not available in **GitHub Copilot Free**.

1. Press the green **Create pull request** button.
1. Scroll down to review the commit history and ensure your changes are present.
1. At the bottom, press the green **Merge pull request** button and then the green **Confirm merge** button.
