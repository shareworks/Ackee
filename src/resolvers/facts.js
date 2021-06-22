'use strict'

const facts = require('../database/facts')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')
const views = require('../database/views')
const viewsType = require('../constants/views')
const durations = require('../database/durations')
const domainIds = require('../utils/domainIds')
const intervals = require('../constants/intervals')
const getOpts = require('../utils/getOpts')

module.exports = {
	Facts: {
		activeVisitors: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const opts = getOpts(_)
			const ids = await domainIds(domain)
			const activeVisitors = await facts.getActiveVisitors(ids, dateDetails, opts)

			return activeVisitors

		}),
		averageViews: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const opts = getOpts(_)
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, (opts.dayDifference || 14), dateDetails, opts)
			const totalCount = entries.reduce((acc, entry) => acc + entry.count, 0)

			return totalCount / entries.length

		}),
		averageDuration: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const opts = getOpts(_)
			const ids = await domainIds(domain)
			const entries = await durations.get(ids, intervals.INTERVALS_DAILY, (opts.dayDifference || 14), dateDetails, opts)
			const totalCount = entries.reduce((acc, entry) => acc + entry.count, 0)

			return totalCount / entries.length

		}),
		viewsToday: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const opts = getOpts(_)
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 1, dateDetails, opts)

			return entries[0].count

		}),
		viewsMonth: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const opts = getOpts(_)
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_MONTHLY, 1, dateDetails, opts)

			return entries[0].count

		}),
		viewsYear: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const opts = getOpts(_)
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_YEARLY, 1, dateDetails, opts)

			return entries[0].count

		}),
		views: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const opts = getOpts(_)
			const ids = await domainIds(domain)
			const amount = await views.all(ids, viewsType.VIEWS_TYPE_UNIQUE, dateDetails, opts)

			return amount

		})
	},
	Query: {
		facts: () => ({})
	}
}
