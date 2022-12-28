'use strict'

const Record = require('../models/Record')
const aggregateActiveVisitors = require('../aggregations/aggregateActiveVisitors')

const getActiveVisitors = async (ids, dateDetails, opts = {}) => {
	const enhance = (entries) => {
		const entry = entries[0]
		return entry == null ? 0 : entry.count
	}

	return enhance(
		await Record.aggregate(
			aggregateActiveVisitors(ids, dateDetails, opts)
		)
	)
}

module.exports = {
	getActiveVisitors
}
