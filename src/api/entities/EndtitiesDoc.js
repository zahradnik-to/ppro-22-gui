/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} name
 * @property {object} contact
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
 * @property {string} companyName
 * @property {string} email
 * @property {string} city
 * @property {string} street
 * @property {string} zipCode
 * @property {string} phone
 * @property {Array[{string}]} role
 */