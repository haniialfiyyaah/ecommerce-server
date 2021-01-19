const ProductController = require('../controllers/productController')
const Auth = require('../middlewares/auth')

const router = require('express').Router()

router.use(Auth.authorizationAdmin)
router.post('/', ProductController.create)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router