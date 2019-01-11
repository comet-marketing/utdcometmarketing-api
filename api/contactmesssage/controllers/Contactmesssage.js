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
    let emailValid = ctx.request.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if (emailValid) {
      let name = ctx.request.body.name.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").trim();
      let message = ctx.request.body.message.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").trim();
  
      ctx.request.body.name = name;
      ctx.request.body.message = message;

      await strapi.plugins['email'].services.email.send({
        to: 'utdcometmarketing@gmail.com',
        from: `${ctx.request.body.email}`,
        replyTo: 'no-reply@utdcometmarketing.com',
        subject: `Contact Form message from ${name}`,
        text: message
      });
  
      return strapi.services.contactmesssage.add(ctx.request.body);
    }
    else {
      return ctx.response.badRequest('Invalid email');
    }
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
