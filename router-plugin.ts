import fs from "node:fs";
import pathl from "node:path";
const fileRegex = /\.(html)$/

export default function myPlugin() {
	console.log("AAAaa")
	const root = import.meta.dirname;
	function processDir(path, routePath='/') {
		const files = fs.readdirSync(path);
		const routes: [string, string][] = [];
		for (const file of files) {
			const stat = fs.statSync(pathl.join(path,file));
			if (stat.isDirectory()) {
				routes.push(...processDir(pathl.join(path,file),pathl.join(routePath,file)));
			}
			routes.push([pathl.join(routePath,file), pathl.join(path, file)])
		}
		return routes
	}
	const routes = processDir('src/routes/')
	const virtualModuleId = 'virtual:routes'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	return {
		name: 'my-plugin', // required, will show up in warnings and errors
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
		load(id) {
			// console.log('load', id)
			if (id === resolvedVirtualModuleId) {
				const routeImports: string[] = [];

				let i = 0;
				for (const [route, path] of routes) {
					routeImports.push(`import _${i} from ${JSON.stringify(pathl.join(root, path))};
routeContents[${JSON.stringify(route)}] = _${i};`);
					i++;
				}
				return `export const routes = ${JSON.stringify(routes)};
export const routeContents = {};
${routeImports.join('\n')}`
			}
		},

		transform(src, id) {
			if (fileRegex.test(id)) {
				return {
					code: `export default ${JSON.stringify(src)}`,
					map: null, // provide source map if available
				}
			}
		},
	}
}