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
 * @property {[EventOfferedPackages]} offeredPackages
 */

/**
 * @typedef {Object} EventOfferedPackages
 * @property {string} id
 * @property {string} startDate
 * @property {string} endDate
 */