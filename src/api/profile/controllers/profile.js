"use strict";

/**
 * profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::profile.profile", ({ strapi }) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;

    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const post = await strapi.entityService.findMany(
      "api::profile.profile",
      query
    );

    const sanitizedEntity = await this.sanitizeOutput(post, ctx);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));
