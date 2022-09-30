const sql = require('mssql');
const express = require('express')
const app = express()
const porta = 5000
const boryParser = require('body-parser')



app.use(boryParser.urlencoded({ extended: true }))

app.listen(porta, () => {
   console.log(`Servidor executando na porta ${porta}`)
})


var sqlConfig = {
   server: 'FELIPE_PC',
   authentication: {
      type: 'default',
      options: {
         userName: 'felipe',
         password: 'felipe'
      }
   },
   options: {
      TrustedConnection: true,
      TrustServerCertificate: true,
      encrypt: false,
      database: 'master'
   }
}


app.get('/veiculos', (req, res) => {

   sql.connect(sqlConfig).then(pool => {
      // Query
      return pool.request()
         .query('select modelo, valor from veiculos')
   }).then(result => {
      res.send(result.recordset)
   }).catch(err => {
      console.log(err)
   });

})

app.get('/veiculos/:id', (req, res) => {

   let obj = {
      id: req.params.id
   }

   sql.connect(sqlConfig).then(pool => {
      // Query
      return pool.request()
         .query(`select modelo, valor from veiculos where id = ${obj.id}`)
   }).then(result => {
      res.send(result.recordset)
   }).catch(err => {
      console.log(err)
   });

})



app.put('/veiculos/:id', (req, res) => {

   let obj = {
      modelo: req.body.modelo,
      valor: req.body.valor,
      id: req.params.id
   }

   let query = `update veiculos set modelo = '${obj.modelo}', valor = ${obj.valor} where id = ${obj.id}`
   sql.connect(sqlConfig).then(pool => {
      // Query
      return pool.request()
         .query(query)
   }).then(result => {
      res.send(obj)
   }).catch(err => {
      console.log(err)
   });


})


app.post('/veiculos', (req, res) => {

   let obj = {
      modelo: req.body.modelo,
      valor: req.body.valor
   }


   let query = `insert into veiculos (modelo, valor, id) values ('${obj.modelo}', ${obj.valor}, next value for id_veiculos)`
   sql.connect(sqlConfig).then(pool => {
      // Query
      return pool.request()
         .query(query)
   }).then(result => {
      res.send(obj)
   }).catch(err => {
      console.log(err)
   });


})


app.delete('/veiculos/:id', (req, res) => {

   let obj = {
      id: req.params.id
   }
   let query = `delete from veiculos where id = ${obj.id}`
   sql.connect(sqlConfig).then(pool => {
      // Query
      return pool.request()
        
         .query(query)
   }).then(result => {
      res.send(result)
   }).catch(err => {
      console.log(err)
   });


})






























//const connStr = "Server=FELIPE_PC;Database=master;User Id=felipe;Password=felipe;Trusted_Connection=True;TrustServerCertificate=True;"; // Não mexa aqui pf tá funcionando certinho


// sql.connect(connStr)
//    .then(conn => global.conn = conn)
//    .catch(err => console.log(err))

//  app.listen(5000, function () {
//     console.log('Serviço rodando na porta 5000')
//  })

//--------------- CRUD ----------------------



// async function buscarVeiculos () {
//    const result = await pool.request()
//             .query(`Select * from veiculos`)
//             pool.close()
//             return Promise.resolve(result.recordset)
// }

// buscarVeiculos()

