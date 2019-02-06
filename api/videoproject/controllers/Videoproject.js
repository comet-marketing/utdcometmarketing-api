'use strict';

/**
 * Videoproject.js controller
 *
 * @description: A set of functions called "actions" for managing `Videoproject`.
 */

module.exports = {

  /**
   * Retrieve videoproject records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.videoproject.search(ctx.query);
    } else {
      return strapi.services.videoproject.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a videoproject record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.videoproject.fetch(ctx.params);
  },

  /**
   * Count videoproject records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.videoproject.count(ctx.query);
  },

  /**
   * Create a/an videoproject record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.videoproject.add(ctx.request.body);
  },

  /**
   * Update a/an videoproject record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.videoproject.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an videoproject record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.videoproject.remove(ctx.params);
  }
};
