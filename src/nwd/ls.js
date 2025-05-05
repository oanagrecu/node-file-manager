import {promises as fs} from "node:fs";
import path from "node:path";
import Table from "cli-table3";

export const ls = async (currentDir) => {
	try {
		const entries = await fs.readdir(currentDir, {withFileTypes: true});

		const formatted = entries
			.map((entry) => ({
				Name: entry.name,
				Type: entry.isDirectory() ? "DIR" : "file",
			}))
			.sort((a, b) => {
				if (a.Type !== b.Type) return a.Type === "DIR" ? -1 : 1;
				return a.Name.localeCompare(b.Name);
			});

		const table = new Table({
			head: ["(index)", "Name", "Type"],
			colAligns: ["right", "left", "left"],
		});

		formatted.forEach((entry, idx) => {
			table.push([idx, `'${entry.Name}'`, `'${entry.Type}'`]);
		});

		console.log(table.toString());
	} catch {
		console.log("Operation failed");
	}
};
