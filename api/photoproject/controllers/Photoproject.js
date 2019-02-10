'use strict';

/**
 * Photoproject.js controller
 *
 * @description: A set of functions called "actions" for managing `Photoproject`.
 */

module.exports = {

  /**
   * Retrieve photoproject records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.photoproject.search(ctx.query);
    } else {
      return strapi.services.photoproject.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a photoproject record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params.slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
      return ctx.notFound();
    }

    return strapi.services.photoproject.fetch(ctx.params);
  },

  /**
   * Count photoproject records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.photoproject.count(ctx.query);
  },

  /**
   * Create a/an photoproject record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.photoproject.add(ctx.request.body);
  },

  /**
   * Update a/an photoproject record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.photoproject.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an photoproject record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.photoproject.remove(ctx.params);
  }
};
