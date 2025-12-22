const express = require("express")
const router = express.Router()
const pool = require("../db/pool")
const result = require("../utils/result")
const { error } = require("node:console")

router.get("/", (req, res) => {
    const { START_DATE, END_DATE } = req.query

    let sql = "SELECT * FROM COURSE"
    let params = []

    if (START_DATE && END_DATE) {
        sql += " WHERE START_DATE BETWEEN ? AND ?"
        params.push(START_DATE, END_DATE)
    }

    pool.query(sql, params, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post("/",(req,res)=>{
    const{COURSE_ID, COURSE_NAME, DESCRIPTION, FEES,
          START_DATE, END_DATE, VIDEO_EXPIRE_DAYS }= req.body

          const sql= `INSERT INTO COURSE (COURSE_ID, COURSE_NAME, DESCRIPTION, 
                 FEES, START_DATE, END_DATE, VIDEO_EXPIRE_DAYS) VALUES(?,?,?,?,?,?,?)`

          pool.query(sql,[COURSE_ID, COURSE_NAME, DESCRIPTION, FEES, START_DATE, END_DATE, VIDEO_EXPIRE_DAYS],(error,data)=>{
            res.send(result.createResult(error,data))
          })
  })

router.put("/update/:COURSE_ID",(req,res)=>{
    const { COURSE_ID } = req.params
    const {
    COURSE_NAME,
    DESCRIPTION,
    FEES,
    START_DATE,
    END_DATE,
    VIDEO_EXPIRE_DAYS
  } = req.body

   const sql =`UPDATE COURSE SET
      COURSE_NAME = ?,
      DESCRIPTION = ?,
      FEES = ?,
      START_DATE = ?,
      END_DATE = ?,
      VIDEO_EXPIRE_DAYS = ?
    WHERE COURSE_ID = ?`

    pool.query(sql,[COURSE_NAME,
      DESCRIPTION,
      FEES,
      START_DATE,
      END_DATE,
      VIDEO_EXPIRE_DAYS,
      COURSE_ID],(error,data)=>{
        res.send(result.createResult(error,data))
      })

})

router.delete("/delete/:COURSE_ID",(req,res)=>{
    const {COURSE_ID}= req.params

    const sql=`DELETE FROM COURSE WHERE COURSE_ID=?`

    pool.query(sql,[COURSE_ID],(error,data)=>{
        res.send(result.createResult(error,data))
    })

})
 
module.exports = router
