// module.exports = app => {
//     app.get('/tasks', (req, res) => {
//       res.json({
//         tasks: [
//           { title: 'Fazer compras' },
//           { title: 'Consertar o pc' }
//         ]
//   }); });
//   };

// module.exports = app => {
//   const Tasks = app.models.tasks;
//   app.get('/tasks', (req, res) => {
//     Tasks.findAll({}, (tasks) => {
//       res.json({ tasks });
//     });
// }); };

module.exports = app => {
  const Tasks = app.models.tasks;

  app.route('/tasks')
    .all(app.auth.authenticate())
    .get(async (req,res) => {
      //Lista as tarefas
      try {
        const where = { userId:req.user.id};
        const result = await Tasks.findAll({where});
        res.json(result);
      } catch(err){
        res.status(412).json({msg:err.message});
      }
    })
    .post(async (req,res) => {
      //Posta novas tarefas
      try {
        req.body.userId = req.user.id;
        const result = await Tasks.create(req.body);
        res.json(result);
      } catch (err){
        res.status(412).json({msg:err.message});
      }
    })

  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    .get(async (req,res) => {
      //tasks/1 consulta uma tarefa
      try{
        const { id } = req.params;
        const where = { id, userId:req.user.id }
        const result = await Tasks.findOne({where})
        if(result){
          res.json(result)
        } else {
          res.sendStatus(404);
        }
      } catch(err){
        res.status(412).json({msg:err.message})
      }
    })
    .put(async (req,res) => {
      //autaliza os parametros de uma tabela (todos)
      try{
        const { id } = req.params;
        const where = { id, userId: req.user.id }
        await Tasks.update(req.body, {where})
        res.sendStatus(204)
      } catch(err){
        res.status(412).json({msg:err.message})
      }
    })
    .delete(async (req,res) => {
      //exclui uma tarefa
      try{
        const { id } = req.params;
        const where = { id, userId: req.user.id}
        await Tasks.destroy({where})
        res.sendStatus(204)
      } catch(err){
        res.status(412).json({msg:err.message})
      }
    })
}