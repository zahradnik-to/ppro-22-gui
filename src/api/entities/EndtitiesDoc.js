/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} name
 * @property {string} shortDescription
 * @property {string} description
 * @property {number} price
 * @property {string} address
 * @property {object} image
 * @property {[Variant]} variants
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
 * @property {string} surname
 * @property {string} email
 * @property {string} city
 * @property {string} street
 * @property {string} zipCode
 * @property {string} phone
 * @property {Array[{string}]} roles
 */