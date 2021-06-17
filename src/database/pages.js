'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const sortings = require('../constants/sortings')

const get = async (ids, sorting, range, limit, dateDetails, opts = {}) => {

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteLocation' ], range, limit, dateDetails, false, opts)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteLocation' ], limit, false, opts)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteLocation' ], limit, false, opts)

	})()

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: entry._id.siteLocation,
			count: entry.count,
			created: entry.created
		}))

	}

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}
