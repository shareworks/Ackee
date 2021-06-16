'use strict'

module.exports = (obj = {}) => {
  return {
    ...obj.organization && { organization: obj.organization }
  }
}
