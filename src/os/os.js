import os from "node:os";

export const getEOL = () => {
	const eol = os.EOL;
	console.log(`EOL: ${JSON.stringify(eol)}`);
	return eol;
};

export const getCPUs = () => {
	const cpus = os.cpus();
	const totalCPUs = cpus.length;
	const cpuInfo = cpus.map((cpu, index) => ({
		index,
		model: cpu.model,
		clockSpeed: (cpu.speed / 1000).toFixed(2),
	}));

	return {totalCPUs, cpuInfo};
};

export const getHomeDir = () => os.homedir();

export const getUsername = () => os.userInfo().username;

export const getArchitecture = () => os.arch();
