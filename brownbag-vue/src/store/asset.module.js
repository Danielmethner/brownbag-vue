export const asset = {
	namespaced: true,
	state: { assetList: [{}], assetListDD: [{}], asset: {} },
	mutations: {
		assetList(state, assetList) {
			state.assetList = assetList
		},
		assetListDD(state, assetListDD) {
			state.assetListDD = assetListDD
		},
	}, 
	getters: {
		assetList: state => state.assetList,
		assetListDD: state => state.assetListDD,
		privatePerson: state => state.privatePerson,
		asset: (state) => (id) => {
			return state.assetList.find(asset => asset.id === id)
		}
	}
};