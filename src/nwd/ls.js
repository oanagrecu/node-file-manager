import {promises as fs} from "node:fs";

export const ls = async (currentDir) => {
	try {
		const entries = await fs.readdir(currentDir, {withFileTypes: true});
		const dirs = [],
			files = [];

		for (const entry of entries) {
			if (entry.isDirectory()) dirs.push(entry.name);
			else files.push(entry.name);
		}

		dirs.sort();
		files.sort();

		dirs.forEach((dir) => console.log(`DIR   ${dir}`));
		files.forEach((file) => console.log(`file  ${file}`));
	} catch (err) {
		console.log("Operation failed");
	}
};
