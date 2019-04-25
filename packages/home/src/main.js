import Vue from 'vue';

import '@/vendor/bootstrap';
import '@/vendor/fontawesome';
import '@/vendor/vue-router-multi-view';

import App from '@/App.vue';
import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app');