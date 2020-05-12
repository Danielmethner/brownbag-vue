export const party = {
	namespaced: true,
	state: { businessList: [{}], businessListDD: [{}], privatePerson: {} },
	mutations: {
		businessList(state, businessList) {
			state.businessList = businessList
		},
		businessListDD(state, businessListDD) {
			state.businessListDD = businessListDD
		},
		privatePerson(state, privatePerson) {
			state.privatePerson = privatePerson
		}
	},
	getters: {
		businessList: state => state.businessList,
		businessListDD: state => state.businessListDD,
		privatePerson: state => state.privatePerson
	}
}
