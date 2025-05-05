// up.js
import path from "node:path";
import os from "node:os";

let currentDir = os.homedir(); 

const up = async () => {
	const root = path.parse(currentDir).root;
	if (currentDir === root) return;
	currentDir = path.dirname(currentDir);
	console.log(`You are currently in ${currentDir}`);
};

await up(); // First up
await up(); // Second up to root
