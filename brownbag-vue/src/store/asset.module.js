export const asset = {
	namespaced: true,
	state: { assetList: [{}], asset: {} },
	mutations: {
		assetList(state, assetList) {
			state.assetList = assetList
		}
	}, 
	getters: {
		assetList: state => state.assetList,
		privatePerson: state => state.privatePerson,
		asset: (state) => (id) => {
			return state.assetList.find(asset => asset.id === id)
		}
	}
};