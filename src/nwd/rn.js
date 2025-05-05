import {rename as fsRename} from "node:fs/promises";
import path from "node:path";

export const rn = async (currentDir, oldPath, newName) => {
	try {
		const oldFullPath = path.resolve(currentDir, oldPath);
		const dir = path.dirname(oldFullPath);
		const newFullPath = path.join(dir, newName);
		await fsRename(oldFullPath, newFullPath);
	} catch {
		console.log("Operation failed");
	}
};
