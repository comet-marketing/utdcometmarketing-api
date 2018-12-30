'use strict';

/**
 * Contactmesssage.js controller
 *
 * @description: A set of functions called "actions" for managing `Contactmesssage`.
 */

module.exports = {

  /**
   * Retrieve contactmesssage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.contactmesssage.search(ctx.query);
    } else {
      return strapi.services.contactmesssage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a contactmesssage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.contactmesssage.fetch(ctx.params);
  },

  /**
   * Count contactmesssage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.contactmesssage.count(ctx.query);
  },

  /**
   * Create a/an contactmesssage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.contactmesssage.add(ctx.request.body);
  },

  /**
   * Update a/an contactmesssage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.contactmesssage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an contactmesssage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.contactmesssage.remove(ctx.params);
  }
};
