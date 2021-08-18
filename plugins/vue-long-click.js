    import Vue from 'vue';

    import { longClickDirective } from 'vue-long-click'

    const longClickInstance = longClickDirective({delay: 400, interval: 50})
    Vue.directive('longclick', longClickInstance)