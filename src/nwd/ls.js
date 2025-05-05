import {promises as fs} from "node:fs";

export const ls = async (currentDir) => {
	try {
		const entries = await fs.readdir(currentDir, {withFileTypes: true});

		const formattedEntries = entries
			.map((entry) => ({
				Name: entry.name,
				Type: entry.isDirectory() ? "DIR" : "file",
			}))
			.sort((a, b) => {
				if (a.Type !== b.Type) {
					return a.Type === "DIR" ? -1 : 1;
				}
				return a.Name.localeCompare(b.Name);
			});

		formattedEntries.forEach((entry, index) => {
			console.log(`${index}\t'${entry.Name}'\t'${entry.Type}'`);
		});
	} catch (err) {
		console.log("Operation failed");
	}
};
