'use strict';

/**
 * Contactmessage.js controller
 *
 * @description: A set of functions called "actions" for managing `Contactmessage`.
 */

module.exports = {

  /**
   * Retrieve contactmessage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.contactmessage.search(ctx.query);
    } else {
      return strapi.services.contactmessage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a contactmessage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.contactmessage.fetch(ctx.params);
  },

  /**
   * Count contactmessage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.contactmessage.count(ctx.query);
  },

  /**
   * Create a/an contactmessage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.contactmessage.add(ctx.request.body);
  },

  /**
   * Update a/an contactmessage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.contactmessage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an contactmessage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.contactmessage.remove(ctx.params);
  }
};
