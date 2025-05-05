#!/usr/bin/env node
import os from "node:os";
import readline from "node:readline";

import {up} from "./src/nwd/up.js";
import {cd} from "./src/nwd/cd.js";
import {ls} from "./src/nwd/ls.js";
import {cat} from "./src/nwd/cat.js";
import {add} from "./src/nwd/add.js";
import {mkdir} from "./src/nwd/mkdir.js";
import {rn} from "./src/nwd/rn.js";
import {cp} from "./src/nwd/cp.js";
import {mv} from "./src/nwd/mv.js";
import {rm} from "./src/nwd/rm.js";
import {getOsInfo} from "./src/os/info.js";
import {hash} from "./src/hash/compute.js";
import {compress} from "./src/compress/compress.js";
import {decompress} from "./src/compress/decompress.js";

const args = process.argv.slice(2);
const userArg = args.find((arg) => arg.startsWith("--username="));
if (!userArg) {
	console.error("Username not provided");
	process.exit(1);
}
const username = userArg.split("=")[1] || "";
console.log(`Welcome to the File Manager, ${username}!`);

let currentDir = os.homedir();
console.log(`You are currently in ${currentDir}`);

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
rl.prompt();

process.on("SIGINT", () => {
	console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
	process.exit(0);
});

rl.on("line", async (input) => {
	const line = input.trim();
	if (!line) {
		console.log(`You are currently in ${currentDir}`);
		rl.prompt();
		return;
	}
	if (line === ".exit") {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`);
		rl.close();
		process.exit(0);
	}
	const parts = line.split(" ");
	const command = parts[0];
	try {
		switch (command) {
			case "up":
				if (parts.length !== 1) throw new Error("Invalid input");
				currentDir = await up(currentDir);
				break;
			case "cd":
				if (parts.length !== 2) throw new Error("Invalid input");
				currentDir = await cd(currentDir, parts[1]);
				break;
			case "ls":
				if (parts.length !== 1) throw new Error("Invalid input");
				await ls(currentDir);
				break;
			case "cat":
				if (parts.length !== 2) throw new Error("Invalid input");
				await cat(currentDir, parts[1]);
				break;
			case "add":
				if (parts.length !== 2) throw new Error("Invalid input");
				await add(currentDir, parts[1]);
				break;
			case "mkdir":
				if (parts.length !== 2) throw new Error("Invalid input");
				await mkdir(currentDir, parts[1]);
				break;
			case "rn":
				if (parts.length !== 3) throw new Error("Invalid input");
				await rn(currentDir, parts[1], parts[2]);
				break;
			case "cp":
				if (parts.length !== 3) throw new Error("Invalid input");
				await cp(currentDir, parts[1], parts[2]);
				break;
			case "mv":
				if (parts.length !== 3) throw new Error("Invalid input");
				await mv(currentDir, parts[1], parts[2]);
				break;
			case "rm":
				if (parts.length !== 2) throw new Error("Invalid input");
				await rm(currentDir, parts[1]);
				break;
			case "os":
				if (parts.length !== 2 || !parts[1].startsWith("--")) throw new Error("Invalid input");
				await getOsInfo(parts[1]);
				break;
			case "hash":
				if (parts.length !== 2) throw new Error("Invalid input");
				await hash(currentDir, parts[1]);
				break;
			case "compress":
				if (parts.length !== 3) throw new Error("Invalid input");
				await compress(currentDir, parts[1], parts[2]);
				break;
			case "decompress":
				if (parts.length !== 3) throw new Error("Invalid input");
				await decompress(currentDir, parts[1], parts[2]);
				break;
			default:
				console.log("Invalid input");
				rl.prompt();
				return;
		}
	} catch (err) {
		console.log(err.message === "Invalid input" ? "Invalid input" : "Operation failed");
		rl.prompt();
		return;
	}
	console.log(`You are currently in ${currentDir}`);
	rl.prompt();
});
