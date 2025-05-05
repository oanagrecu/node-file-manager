import os from "node:os";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
import {ls} from "./src/nwd/ls.js";
import {cd} from "./src/nwd/cd.js";
import {up} from "./src/nwd/up.js";
import {cat} from "./src/nwd/cat.js";
import {add} from "./src/nwd/add.js";
import {mkdir} from "./src/nwd/mkdir.js";
import {rn} from "./src/nwd/rn.js";
import {cp} from "./src/nwd/cp.js";
import {mv} from "./src/nwd/mv.js";
import {rm} from "./src/nwd/rm.js";
import {hash} from "./src/hash/hash.js";
import {getEOL, getCPUs, getHomeDir, getUsername, getArchitecture} from "./src/os/os.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg?.split("=")[1];

if (!username) {
	console.log("Username not provided");
	process.exit(1);
}

let currentDir = os.homedir();

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDir();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: `${currentDir}> `,
});

rl.prompt();

rl.on("line", async (line) => {
	const input = line.trim();
	const [command, ...args] = input.split(" ");

	try {
		switch (command) {
			case "up":
				currentDir = await up(currentDir);
				break;

			case "cd":
				if (args.length !== 1) {
					console.log("Invalid input: Expect to have: 1 param(s) provided.");
				} else {
					const result = await cd(currentDir, args[0]);
					if (result) currentDir = result;
				}
				break;

			case "ls":
				await ls(currentDir);
				break;

			case ".exit":
				exitApp();
				return;

			case "cat":
				if (args.length !== 1) {
					console.log("Invalid input: Expect to have: 1 param(s) provided.");
				} else {
					await cat(currentDir, args[0]);
				}
				break;

			case "add":
				if (args.length !== 1) console.log("Invalid input: Expect to have: 1 param(s) provided.");
				else await add(currentDir, args[0]);
				break;

			case "mkdir":
				if (args.length !== 1) console.log("Invalid input: Expect to have: 1 param(s) provided.");
				else await mkdir(currentDir, args[0]);
				break;

			case "rn":
				if (args.length !== 2) console.log("Invalid input: Expect to have: 2 param(s) provided.");
				else await rn(currentDir, args[0], args[1]);
				break;

			case "cp":
				if (args.length !== 2) console.log("Invalid input: Expect to have: 2 param(s) provided.");
				else await cp(currentDir, args[0], args[1]);
				break;

			case "mv":
				if (args.length !== 2) console.log("Invalid input: Expect to have: 2 param(s) provided.");
				else await mv(currentDir, args[0], args[1]);
				break;

			case "rm":
				if (args.length !== 1) console.log("Invalid input: Expect to have: 1 param(s) provided.");
				else await rm(currentDir, args[0]);
				break;

			case "hash":
				if (args.length !== 1) console.log("Invalid input: Expect to have: 1 param(s) provided.");
				else await hash(currentDir, args[0]);
				break;
			case "os":
				if (args.length !== 1) {
					console.log("Invalid input: Expect to have: 1 param(s) provided.");
				} else {
					switch (args[0]) {
						case "--EOL":
							const eol = getEOL();

							break;

						case "--cpus":
							const cpuInfo = getCPUs();
							console.log(`Total CPUs: ${cpuInfo.totalCPUs}`);
							cpuInfo.cpuInfo.forEach((cpu) =>
								console.log(
									`CPU ${cpu.index}: Model - ${cpu.model}, Clock Speed - ${cpu.clockSpeed} GHz`
								)
							);
							break;

						case "--homedir":
							console.log(getHomeDir());
							break;

						case "--username":
							console.log(getUsername());
							break;

						case "--architecture":
							console.log(getArchitecture());
							break;

						default:
							console.log("Invalid OS command");
							break;
					}
				}
				break;

			default:
				console.log("Invalid input");
		}
	} catch (err) {
		console.log("Operation failed");
	}

	printCurrentDir();
	rl.setPrompt(`${currentDir}> `);
	rl.prompt();
});

rl.on("close", () => {
	exitApp();
});

process.on("SIGINT", () => {
	exitApp();
});

function printCurrentDir() {
	console.log(`You are currently in ${currentDir}`);
}

function exitApp() {
	console.log(`Thank you for using File Manager, ${username}, Goodbye!`);
	process.exit(0);
}
