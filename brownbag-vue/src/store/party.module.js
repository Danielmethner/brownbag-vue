export const party = {
	namespaced: true,
	state: { businessList: [{}], businessListDD: [{}], privatePerson: {}, business: {} },
	mutations: {
		businessList(state, businessList) {
			state.businessList = businessList
		},
		businessListDD(state, businessListDD) {
			state.businessListDD = businessListDD
		},
		privatePerson(state, privatePerson) {
			state.privatePerson = privatePerson
		},
		business(state, business) {
			state.business = business
		}
	},
	getters: {
		businessList: state => state.businessList,
		businessListDD: state => state.businessListDD,
		privatePerson: state => state.privatePerson,
		business: state => state.business,
		businessById: (state) => (id) => {
			return state.businessList.find(business => business.id === id)
		}
	}
}
