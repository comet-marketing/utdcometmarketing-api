'use strict';
const fetch = require('node-fetch');

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
    let emailValid = ctx.request.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let secret = '6LeyIokUAAAAABINV6Fr0UMnb1JjwOhGZ539TY9b';
    let score = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${ctx.request.body.recaptchaScore}`, {
      method: 'POST'
    });
    let response = await score.json();
    if (emailValid && response.success) {
      let name = ctx.request.body.name.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").trim();
      let message = ctx.request.body.message.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").trim();
      ctx.request.body.name = name;
      ctx.request.body.message = message;
      let email = ctx.request.body.email;
      let whom = ctx.request.body.whom;
      let where = ctx.request.body.where;
      let phone = ctx.request.body.phone;

      await strapi.plugins['email'].services.email.send({
        to: 'utdcometmarketing@gmail.com',
        from: `contactform@utdcometmarketing.com`,
        replyTo: 'no-reply@utdcometmarketing.com',
        subject: `Contact Form message from ${name}`,
        text: `From: ${email}, \n Message: ${message} \n\n Phone: ${phone}\n Who: ${whom}\nWhere: ${where}`,
        html: `From: ${email}, <br> Message: ${message} <br><br> Who: ${whom}<br> Phone: ${phone} <br>Where: ${where}`
      });

      let clientEmail = `Thank you so much for reaching out to us at UTD Comet Marketing! Someone will be in contact with you shortly!\n\n Please do not reply to this automated email.`

      await strapi.plugins['email'].services.email.send({
        to: `${email}`,
        from: `no-reply@utdcometmarketing.com`,
        replyTo: 'no-reply@utdcometmarketing.com',
        subject: `Thank you for reaching out to Comet Marketing!`,
        text: `From: ${email}, \n Message: ${clientEmail} \n\n Who: ${whom}\nWhere: ${where}`,
        html: `Dear ${whom}, <br> ${clientEmail} <br><br> Who: ${whom}<br>Where: ${where}`
      })
      return strapi.services.contactmessage.add(ctx.request.body);
    }
    else {
      return ctx.response.badRequest('Invalid email');
    }
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
