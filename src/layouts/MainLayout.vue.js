import { TheHeader, TheSidebar } from './components';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-layout" },
});
const __VLS_0 = {}.TheHeader;
/** @type {[typeof __VLS_components.TheHeader, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "main-layout__header" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "main-layout__header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-layout__body" },
});
const __VLS_4 = {}.TheSidebar;
/** @type {[typeof __VLS_components.TheSidebar, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "main-layout__sidebar" },
}));
const __VLS_6 = __VLS_5({
    ...{ class: "main-layout__sidebar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "main-layout__content" },
});
const __VLS_8 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['main-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['main-layout__header']} */ ;
/** @type {__VLS_StyleScopedClasses['main-layout__body']} */ ;
/** @type {__VLS_StyleScopedClasses['main-layout__sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['main-layout__content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TheHeader: TheHeader,
            TheSidebar: TheSidebar,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
