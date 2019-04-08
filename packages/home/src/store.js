import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import eventBus from '@/eventBus';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			nickname: 'admin',
			fullname: 'Administrator',
			email: 'admin@example.com',
			phone: '+00000000000',
			address: '742 Evergreen Terrace',
			avatar: require('@/assets/img/noavatar.svg')
		},
		settings: {
			tooltipDescriptionsEnabled: true,
			showHiddenFilesEnabled: false
		}
	},
	getters: {
		async languages() {
			return [
				{
					enabled: true,
					id: 'en_US',
					name: 'English',
					img: require('@/assets/img/flags/uk.svg')
				},
				{
					enabled: true,
					id: 'es_ES',
					name: 'Spanish',
					img: require('@/assets/img/flags/es.svg')
				}
			];
		},
		async tools() {
			return [
				{
					enabled: true,
					id: 'stpivot',
					name: 'STPivot',
					url: 'plugin/jpivot/AnalysisViewService?component=newView'
				},
				{
					enabled: true,
					id: 'stdashboard',
					name: 'STDashboard',
					url: 'content/stdashboard?solution=system&path=temp&action=true'
				},
				{
					enabled: true,
					id: 'stcard',
					name: 'STCard',
					url: 'stcard/menu/STCard.jsp'
				},
				{
					enabled: true,
					id: 'streport',
					name: 'STReport',
					url: 'content/saiku-adhoc/web/index.html?biplugin=true'
				},
				{
					enabled: true,
					id: 'stagile',
					name: 'STAgile',
					url: 'content/stagile/ui/index.html#!/new'
				}
			].filter(tool => tool.enabled);
		},
		async categories() {
			return [
				{
					enabled: true,
					id: 'marketing',
					name: 'Marketing',
					icon: require('@/assets/img/categories/icons/marketing.svg'),
					banner: require('@/assets/img/categories/banners/marketing.png')
				},
				{
					enabled: true,
					id: 'retail',
					name: 'Retail',
					icon: require('@/assets/img/categories/icons/retail.svg'),
					banner: require('@/assets/img/categories/banners/retail.png')
				},
				{
					enabled: true,
					id: 'finance',
					name: 'Finance',
					icon: require('@/assets/img/categories/icons/finance.svg'),
					banner: require('@/assets/img/categories/banners/finance.png')
				},
				{
					enabled: true,
					id: 'ngo',
					name: 'NGO',
					icon: require('@/assets/img/categories/icons/ngo.svg'),
					banner: require('@/assets/img/categories/banners/ngo.png')
				},
				{
					enabled: true,
					id: 'gov',
					name: 'GOV',
					icon: require('@/assets/img/categories/icons/gov.svg'),
					banner: require('@/assets/img/categories/banners/gov.png')
				},
				{
					enabled: true,
					id: 'e-commerce',
					name: 'e-Commerce',
					icon: require('@/assets/img/categories/icons/e-commerce.svg'),
					banner: require('@/assets/img/categories/banners/e-commerce.png')
				},
				{
					id: 'telco',
					name: 'Telco',
					icon: require('@/assets/img/categories/icons/telco.svg'),
					banner: require('@/assets/img/categories/banners/telco.png')
				},
				{
					enabled: true,
					id: 'utilities',
					name: 'Utilities',
					icon: require('@/assets/img/categories/icons/utilities.svg'),
					banner: require('@/assets/img/categories/banners/utilities.png')
				},
				{
					enabled: true,
					id: 'tourism',
					name: 'Tourism',
					icon: require('@/assets/img/categories/icons/tourism.svg'),
					banner: require('@/assets/img/categories/banners/tourism.png')
				},
				{
					enabled: true,
					id: 'education',
					name: 'Education',
					icon: require('@/assets/img/categories/icons/education.svg'),
					banner: require('@/assets/img/categories/banners/education.png')
				},
				{
					enabled: true,
					id: 'health',
					name: 'Health',
					icon: require('@/assets/img/categories/icons/health.svg'),
					banner: require('@/assets/img/categories/banners/health.png')
				},
				{
					enabled: true,
					id: 'rrhh',
					name: 'RRHH',
					icon: require('@/assets/img/categories/icons/rrhh.svg'),
					banner: require('@/assets/img/categories/banners/rrhh.png')
				},
				{
					enabled: true,
					id: 'pharma',
					name: 'Pharma',
					icon: require('@/assets/img/categories/icons/pharma.svg'),
					banner: require('@/assets/img/categories/banners/pharma.png')
				}
			].filter(category => category.enabled);
		},
		async sidebar(state, getters) {
			return [
				{
					enabled: true,
					id: 'home',
					name: 'Home',
					icon: ['fas', 'angle-double-right'],
					subitems: [
						{
							id: 'sthome',
							name: 'Home',
							icon: ['fac', 'tool-sthome'],
							to: {
								name: 'perspective',
								params: { perspective: 'sthome.perspective' }
							},
							click() {}
						},
						{
							id: 'stadmin',
							name: 'Administration',
							icon: ['fac', 'tool-stadmin'],
							to: {
								name: 'perspective',
								params: { perspective: 'stadmin.perspective' }
							},
							click() {}
						}
					]
				},
				{
					enabled: true,
					id: 'tools',
					name: 'Tools',
					icon: ['fas', 'plus'],
					subitems: (await getters.tools).map(tool => ({
						id: tool.id,
						name: tool.name,
						icon: ['fac', `tool-${tool.id}`],
						to: undefined,
						click() {
							router.push({
								name: 'perspective',
								params: { perspective: 'opened.perspective' }
							});
							eventBus.$emit('mantle.invoke', mantleWindow => {
								mantleWindow.openURL(tool.name, tool.name, tool.url);
							});
						}
					}))
				},
				{
					enabled: true,
					id: 'opened',
					name: 'Opened',
					icon: ['far', 'window-maximize'],
					to: {
						name: 'perspective',
						params: { perspective: 'opened.perspective' }
					},
					click() {}
				},
				{
					enabled: true,
					id: 'browser',
					name: 'Browser',
					icon: ['fas', 'folder-open'],
					to: {
						name: 'perspective',
						params: { perspective: 'browser.perspective' }
					},
					click() {}
				},
				{
					enabled: true,
					id: 'stsearch',
					name: 'STSearch',
					icon: ['fac', 'tool-stsearch'],
					to: undefined,
					click() {
						router.push({
							name: 'perspective',
							params: { perspective: 'search.perspective' }
						});
						eventBus.$emit(
							'mantle.perspective.params',
							'search.perspective',
							{}
						);
					}
				},
				{
					enabled: true,
					id: 'favorites',
					name: 'Favorites',
					icon: ['fas', 'star'],
					to: undefined,
					click() {
						router.push({
							name: 'perspective',
							params: { perspective: 'favorites.perspective' }
						});
						eventBus.$emit(
							'mantle.perspective.reload',
							'favorites.perspective'
						);
					}
				},
				{
					enabled: true,
					id: 'recents',
					name: 'Recents',
					icon: ['far', 'clock'],
					to: undefined,
					click() {
						router.push({
							name: 'perspective',
							params: { perspective: 'recents.perspective' }
						});
						eventBus.$emit('mantle.perspective.reload', 'recents.perspective');
					}
				},
				{
					enabled: false,
					id: 'schedules',
					name: 'Schedules',
					icon: ['fas', 'hourglass-half'],
					to: {
						name: 'perspective',
						params: { perspective: 'schedules.perspective' }
					},
					click() {}
				},
				{
					enabled: false,
					id: 'admin',
					name: 'Admin',
					icon: ['fas', 'tools'],
					to: {
						name: 'perspective',
						params: { perspective: 'admin.perspective' }
					},
					click() {}
				},
				{
					enabled: false,
					id: 'marketplace',
					name: 'Marketplace',
					icon: ['fas', 'store'],
					to: {
						name: 'perspective',
						params: { perspective: 'marketplace.perspective.osgi' }
					},
					click() {}
				},
				{
					enabled: true,
					id: 'language',
					name: 'Language',
					icon: ['fas', 'globe-europe'],
					subitems: (await getters.languages).map(lang => ({
						id: lang.id,
						name: lang.name,
						img: lang.img,
						to: { name: 'home', query: { locale: lang.id } },
						click() {}
					}))
				},
				{
					enabled: true,
					id: 'logout',
					name: 'Logout',
					icon: ['fas', 'sign-out-alt'],
					to: { name: 'logout' },
					click() {}
				}
			].filter(item => item.enabled);
		}
	},
	mutations: {},
	actions: {}
});
