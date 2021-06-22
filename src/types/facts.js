'use strict'

const { gql } = require('apollo-server-micro')

module.exports = gql`
	"""
	Facts about a domain. Usually simple data that can be represented in one value.
	"""
	type Facts {
		"""
		Number of visitors currently on your site.
		"""
		activeVisitors( organization: ID ): UnsignedInt!
		"""
		Average number of visitors per day during the last 14 days.
		"""
		averageViews( organization: ID, minDate: DateTime, maxDate: DateTime ):  UnsignedInt!
		"""
		Average visit duration of the last 14 days in milliseconds.
		"""
		averageDuration( organization: ID, minDate: DateTime, maxDate: DateTime ):  UnsignedInt!
		"""
		Number of unique views today.
		"""
		viewsToday( organization: ID ):  UnsignedInt!
		"""
		Number of unique views this month.
		"""
		viewsMonth( organization: ID ):  UnsignedInt!
		"""
		Number of unique views this year.
		"""
		viewsYear( organization: ID ):  UnsignedInt!
    """
		Number of unique views during the given date range.
		"""
		views( organization: ID, minDate: DateTime, maxDate: DateTime ):  UnsignedInt!
	}

	type Query {
		"""
		Customized: Facts of (all or 1) domains / organization combined. Usually simple data that can be represented in one value.
		"""
		facts: Facts!
	}
`
