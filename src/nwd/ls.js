import {promises as fs} from "node:fs";
import path from "node:path";

export const ls = async (currentDir) => {
	try {
		const entries = await fs.readdir(currentDir, {withFileTypes: true});

		const formattedEntries = entries
			.map((entry) => ({
				Name: entry.name,
				Type: entry.isDirectory() ? "directory" : "file",
			}))
			.sort((a, b) => {
				if (a.Type !== b.Type) return a.Type === "directory" ? -1 : 1;
				return a.Name.localeCompare(b.Name);
			});

		console.log(`| ${"(index)".padEnd(7)} | ${"Name".padEnd(30)} | ${"Type".padEnd(10)} |`);
		console.log("|" + "-".repeat(9) + "|" + "-".repeat(32) + "|" + "-".repeat(12) + "|");

		formattedEntries.forEach((entry, index) => {
			const indexStr = String(index).padEnd(7);
			const nameStr = `'${entry.Name}'`.padEnd(30);
			const typeStr = `'${entry.Type}'`.padEnd(10);
			console.log(`| ${indexStr} | ${nameStr} | ${typeStr} |`);
		});
	} catch (err) {
		console.log("Operation failed");
	}
};
