export const asset = {
	namespaced: true,
	state: { assets: [{ 'faef': 1 }], assetsDD: [{}] },
	actions: {
		refreshAssets({ commit }, assets) {
			commit('refreshAssets', assets);
		}
	},
	mutations: {
		refreshAssets(assets) {
			this.state.assets = assets;
		}
	}
};