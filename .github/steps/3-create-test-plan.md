## Step 3: Run the COBOL application and create a test plan to ensure quality of our legacy codebase

In the following activities we will build and run the COBOL accounting application and create a test plan that we can use to ensure the quality of our legacy codebase.

Running the COBOL application will help us understand how it works and what it does.

### ⌨️ Activity: Build and run the COBOL application

COBOL is a compiled language, we need to compile the source code before we can run it.

But... you don't know how to compile COBOL source code, right? No problem!

Because that is a common task, we have already set up a custom prompt file that is ready to use in your codespace!

1. Inside your Copilot Chat window, make sure you are still using **Agent Mode**.
1. Use the **Run COBOL App** prompt file by typing `/runCobolApp` in the chat input box and selecting the prompt from the list. You don't need to type anything else, just select the prompt.
   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > /runCobolApp
   > ```

   <!--- TODO: add screenshot -->
   > 🪧 **Note:** You can find the contents of the prompt file in `.github/prompts` directory. You can learn more about prompt files [here](https://code.visualstudio.com/docs/copilot/copilot-customization).
1. Play with the Cobol App to see how it works!
   - The application will prompt you to select an option from the menu.
   - Try playing with the different options of the COBOL accounting app and when you are done select option `4` to exit.

### ⌨️ Activity: Generate a test plan from the specification

Given the software specification we created in the previous step, we want to generate a comprehensive test plan that covers all critical functionalities and edge cases documented in the specification.

We will use that test plan to validate both the specification (with domain experts) and the Node.js implementation later.

1. Inside your Copilot Chat window, make sure you are still using **Agent Mode**.
1. Add the specification as context: Click **Add Context...**, select **Files & Folders**, then select `docs/SPECIFICATION.md`.
1. Provide Copilot the specific instructions and requirements for the test plan by typing or pasting the above prompt in the chat input box.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Using the software specification in docs/SPECIFICATION.md, create a comprehensive test plan that validates all documented behavior.
   >
   > Store it in a file called docs/TESTPLAN.md.
   >
   > The test plan should be derived from the specification's business rules and operations—NOT from reading the COBOL code directly.
   >
   > Later I would like to use this test plan to create unit and integration tests in a Node.js app that implements the specification.
   >
   > The test plan should include the following headings:
   > 1. Test Case ID
   > 2. Test Case Description
   > 3. Pre-conditions
   > 4. Test Steps
   > 5. Expected Result
   > 6. Actual Result
   > 7. Status (Pass/Fail)
   > 8. Comments
   >
   > Please create the test plan in a markdown table format. The test plan should cover all business rules and operations documented in the specification.
   > ```

1. Make sure you can preview the test plan in the `docs/TESTPLAN.md` file. If there are any issues, you can continue chatting with Copilot to refine the test plan until you are satisfied with the results.

1. Commit the changes to the `docs/TESTPLAN.md` file and push to the `modernize-legacy-code` branch.

   > 💡 **Tip:** You can use Copilot to help you with the commit message like in the last step, or write your own.

<details>
<summary>Having trouble? 🤷</summary><br/>

- If you don't see the `/runCobolApp` prompt in the list, make sure you are using **Agent Mode**.
- If you don't get feedback, make sure your pushed the `docs/TESTPLAN.md` file changes to the branch `modernize-legacy-code`.

</details>
