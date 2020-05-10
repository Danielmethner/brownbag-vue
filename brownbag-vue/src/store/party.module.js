export const party = {
	namespaced: true,
	state: { businessList: [{}], businessListDD: [{}] },
	mutations: {
		businessList(state, businessList) {
			state.businessList = businessList
		},
		businessListDD(state, businessListDD) {
			state.businessListDD = businessListDD
		}
	},
	getters: {
		businessList: state => state.businessList,
		businessListDD: state => state.businessListDD
	}
}
