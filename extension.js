// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "unit-test-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('unit-test-generator.generateUnitTest', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Unit Test Generator!');
		const currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		const filePath = currentlyOpenTabfilePath.replace('.js','');
		const fileName = _.last(filePath.split('/'));
		const fileContent = `
			describe('Test ${fileName}', () => {
				beforeEach(() => {
				});
				afterEach(() => {
					jest.resetModules();
					jest.clearAllMocks();
				});
				it('Test ${fileName}', async () => {
					const ${fileName} = require('./${fileName}');
				});
			});
		`;
		fs.writeFile(`${filePath}.test.js`, fileContent.trim(), (error) => {
			console.log('error =====> ', error);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
