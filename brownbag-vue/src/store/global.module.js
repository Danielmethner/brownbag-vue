export const GLOBAL = {
	namespaced: true,
	state: {
		API_BASE_URL: process.env.VUE_APP_API_URL,
		CURRENT_ENV: process.env.NODE_ENV,
		FIN_STMT_TYPE: {
			BAL_SHEET: 'BAL_SHEET',
			INCOME_STMT: 'INCOME_STMT'
		},
		CTRL_VAR: {
			NATP_INIT_DEPOSIT_INTR_RATE: 'NATP_INIT_DEPOSIT_INTR_RATE'
		}
	}
};
