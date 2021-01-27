const CartController = require('../controllers/cartController')
const Auth = require('../middlewares/auth')

const router = require('express').Router()

//auth customer
router.use(Auth.authentication)
router.get('/', CartController.findAll)
router.get('/customer', CartController.findByCust)
router.post('/', CartController.create)
// router.use(Auth.authorizationCart)
router.patch('/:id', Auth.authorizationCart, CartController.updateQty)
router.delete('/:id', Auth.authorizationCart, CartController.delete)

module.exports = router