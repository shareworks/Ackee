'use strict'

const mongoose = require('mongoose')

module.exports = (obj = {}) => {
  let dayDifference

  if (obj.minDate) {
    const date1 = new Date(obj.minDate)
    const date2 = obj.maxDate ? new Date(obj.maxDate) : new Date()

    const timeDifference = date2.getTime() - date1.getTime()
    dayDifference = Math.abs(Math.ceil(timeDifference / (1000 * 3600 * 24)))
  }

  return {
    ...obj.organization && { organization: mongoose.Types.ObjectId(obj.organization) },
    ...obj.minDate && { minDate: obj.minDate },
    ...obj.maxDate && { maxDate: obj.maxDate },
    ...dayDifference && { dayDifference }
  }
}
