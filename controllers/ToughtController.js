const Tought = require ('../models/Tought')
const User = require ('../models/User')
const { Op } = require('sequelize')
const { search } = require('../routers/toughtsRouters')

module.exports = class ToughtController {
    static async dashboard(req, res) {
        const userId = req.session.userid
        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought,
            plain: true,
        })
        const toughts = user.Toughts.map((result) => result.dataValues)
        let emptyToughts = true
        if(toughts.length > 0) {
            emptyToughts = false
        }
        console.log(toughts)
        console.log(emptyToughts)
        res.render('toughts/dashboard', { toughts, emptyToughts })
    }
    
    static showToughts(req, res){
        console.log(req.query)
        let search = ''
        if(req.query.search){
            search = req.query.search
        }
        let order = 'DESC'
        if(req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        Tought.findAll({
            include: User,
            where: {
                title: { [op.like]: `%${search}`},
            },
            order: [['createdAt']. order],
    })
    .then((data) =>{
        let toughtQty = data.length
        if(toughtQty === 0)
            toughtQty = false
        
        const toughts = data.map((result) => result.get({ plain: true }))
        
        res.render('toughts/home', {toughts, toughtQty, search})
    })
    .catch((err) => console.log(err))
    
}
}
