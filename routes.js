Router.route('/', function () {
  this.render('game');
});

Router.map(function () {
  this.route('api', {
    path: '/api',
    where: 'server',
    action: function () {
      var json = Game.findOne(); // what ever data you want to retur
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });
});
