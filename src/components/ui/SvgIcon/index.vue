<template>
    <component :is="iconComponent" v-if="iconComponent" class="dynamic-icon" v-bind="$attrs" />
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
    inheritAttrs: false,
    name: 'SvgcIcon'
});
const props = defineProps({
    name: String,
})
const modules = import.meta.glob('../../assets/**/*.svg', { eager: true });
const map = {};
for (const path in modules) {
    const module = modules[path];
    const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
    map[fileName] = module.default;
}
const iconComponent = computed(() => {
    return map[props.name];
});
</script>

<style scoped>
.dynamic-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
</style>