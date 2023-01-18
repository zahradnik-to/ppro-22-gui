/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} name
 * @property {object} contact Todo contact info appended on BE from owner id?
 * @property {string} contact.name
 * @property {string} contact.phoneNumber
 * @property {string} descriptionShort
 * @property {string} descriptionLong
 * @property {number} price
 * @property {string} address
 * @property {string} image
 * @property {[Variant]} offeredPackages
 */

/**
 * @typedef {Object} Variant
 * @property {string} id
 * @property {string} eventId
 * @property {string} startDate
 * @property {string} endDate
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} address // Todo address as object with city, street,... ?
 * @property {Array[{string}]} roles
 */