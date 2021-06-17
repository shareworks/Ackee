'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const sortings = require('../constants/sortings')
const constants = require('../constants/referrers')

const get = async (ids, sorting, type, range, limit, dateDetails, opts) => {

	const aggregation = (() => {

		if (type === constants.REFERRERS_TYPE_WITH_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'source', 'siteReferrer' ], range, limit, dateDetails, true, opts)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'source', 'siteReferrer' ], limit, true, opts)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'source', 'siteReferrer' ], limit, true, opts)
		}
		if (type === constants.REFERRERS_TYPE_NO_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteReferrer' ], range, limit, dateDetails, false, opts)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteReferrer' ], limit, false, opts)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteReferrer' ], limit, false, opts)
		}
		if (type === constants.REFERRERS_TYPE_ONLY_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'source' ], range, limit, dateDetails, false, opts)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'source' ], limit, false, opts)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'source' ], limit, false, opts)
		}

	})()

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: entry._id.source || entry._id.siteReferrer,
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
