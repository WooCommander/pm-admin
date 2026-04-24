import { computed } from 'vue';
import { SIDEBAR_MENU } from '@/shared/constants';
const primaryItems = computed(() => SIDEBAR_MENU.filter((i) => i.group === 'primary'));
const adminItems = computed(() => SIDEBAR_MENU.filter((i) => i.group === 'admin'));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: "the-sidebar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "the-sidebar__group" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.primaryItems))) {
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (item.key),
        to: (item.path),
        ...{ class: "the-sidebar__item" },
        activeClass: "the-sidebar__item--active",
    }));
    const __VLS_2 = __VLS_1({
        key: (item.key),
        to: (item.path),
        ...{ class: "the-sidebar__item" },
        activeClass: "the-sidebar__item--active",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    (item.title);
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "the-sidebar__divider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "the-sidebar__group" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.adminItems))) {
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        key: (item.key),
        to: (item.path),
        ...{ class: "the-sidebar__item" },
        activeClass: "the-sidebar__item--active",
    }));
    const __VLS_6 = __VLS_5({
        key: (item.key),
        to: (item.path),
        ...{ class: "the-sidebar__item" },
        activeClass: "the-sidebar__item--active",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    (item.title);
    var __VLS_7;
}
/** @type {__VLS_StyleScopedClasses['the-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['the-sidebar__group']} */ ;
/** @type {__VLS_StyleScopedClasses['the-sidebar__item']} */ ;
/** @type {__VLS_StyleScopedClasses['the-sidebar__divider']} */ ;
/** @type {__VLS_StyleScopedClasses['the-sidebar__group']} */ ;
/** @type {__VLS_StyleScopedClasses['the-sidebar__item']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            primaryItems: primaryItems,
            adminItems: adminItems,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
