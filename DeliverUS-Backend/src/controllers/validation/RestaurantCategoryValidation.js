import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'
const checkNoExists = async (value, { req }) => {
  try {
    const rc = await RestaurantCategory.findOne({ where: { name: value } })
    if (rc) { // si no existe, lo rechaza
      return Promise.reject(new Error('Ya hay dos categorias con el mismo nombre.'))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim(),
  check('name').custom(checkNoExists)
]
export { create }
