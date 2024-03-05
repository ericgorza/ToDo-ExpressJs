module.exports = app => {
  async function start(port) {
    try {
      await app.db.authenticate();
      await app.db.sync();
      app.listen(port, () => {
        console.log(`NTask API - porta ${port}`);
      });
    } catch (err) {
      console.log('Erro de conexão com banco de dados.');
      console.error(err);
} }
  start(app.get('port'));
}