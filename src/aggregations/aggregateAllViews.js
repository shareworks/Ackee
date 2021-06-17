'use strict'

const matchDomains = require('../stages/matchDomains')

module.exports = (ids, unique, dateDetails, opts = {}) => {

	const aggregation = [
		matchDomains(ids),
		{
			$count: 'count'
		}
	]

	// A user that navigates between pages will increase the counter temporary.
	// It's therefore importend to count unique views only.
	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	if (opts.organization) {
		aggregation[0].$match.organization = opts.organization
	}

	if (opts.minDate || opts.maxDate) {
		aggregation[0].$match.created = {
			...opts.minDate && { $gte: new Date(opts.minDate) },
			...opts.maxDate && { $lt: new Date(opts.maxDate) }
		}
	}

	return aggregation

}
