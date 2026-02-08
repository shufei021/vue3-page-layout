const modules = import.meta.glob('./modules/*.js', { eager: true });
const map = {};
for (const path in modules) {
    const module = modules[path];
    const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
    map[fileName] = module.default;
}
export default map;