const server = require('server');
const { get, post, put, del } = server.router;
const Competition = require('../../models/competition');

const getById = get('/competition/:id', async ctx => {
  if (!ctx.params.id) {
    return server.reply.status(404).send('Missing competition id');
  }
   let competition = await Competition.findOne({ id: ctx.params.id }).exec();
   if (!competition) {
     return server.reply.status(404).send('Competition not found');
   }
   return competition;
})

module.exports = [ getById ];