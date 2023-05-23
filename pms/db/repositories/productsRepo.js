const DB = require("..");
const { Helpers } = require("../../utils")

class ProductsRepo {
  constructor() {
    this.client = DB.client;
  }

  async addProducts(product_name, product_sku, product_quantity, product_unit_price, product_age_limit, product_description, userId, productImageUrl) {

    let result = {} 

    try {

      const isProductExist = await this.client.query(`SELECT * FROM products WHERE product_sku = '${product_sku}' and created_by = ${userId}`)

      if(isProductExist.rows.length > 0) {
         result.isProductAlreadyExist = true
      } else {

         const values = [
          product_name,
          product_sku,
          product_quantity,
          product_unit_price,
          userId,
          product_age_limit,
          product_description,
          productImageUrl
         ]

         console.log(values)
         const product = await this.client.query({
          text: `INSERT INTO products(product_name, product_sku, product_quantity, product_unit_price, created_by, product_age_limit, product_description, url)
                 VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
          values: values       
         })

         result.isProductAlreadyExist = false;
         result.data = product.rows

      }

    } catch (ex) {
      console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async getProducts(userId) {

    let result = {} 

    try {

      const products = await this.client.query(`SELECT * FROM products  WHERE created_by = ${userId}`)

      result.data = products.rows

    } catch (ex) {
      result.hasException = true
    } finally {
      return result
    }
    
  }
  
  async updateProducts(product_id, product_name, product_quantity, product_unit_price, product_age_limit, product_description) {

    let result = {} 

    try {

      const isProductExist = await this.client.query(`SELECT * FROM products WHERE product_id = ${product_id}`)

      if(isProductExist.rows.length <= 0) {
         result.isProductExist = false
      } else {

         const product = await this.client.query(`UPDATE products
                                                  SET product_name = '${product_name}',
                                                      product_quantity = ${product_quantity},
                                                      product_unit_price = ${product_unit_price},
                                                      product_age_limit = ${product_age_limit}, 
                                                      product_description = '${product_description}'
                                                  WHERE product_id = ${product_id} RETURNING *`)

         result.isProductExist = true;
         result.data = product.rows

      }

    } catch (ex) {
      console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async getProduct(product_sku) {

    let result = {} 

    try {

      const products = await this.client.query(`SELECT products.*, users.city, users.address FROM products INNER JOIN users ON products.created_by = users.user_id WHERE product_sku = '${product_sku}'`)

      result.data = products.rows

    } catch (ex) {
      console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async getNotifications(userId) {

    let result = {} 

    try {

      const products = await this.client.query(`SELECT * FROM products WHERE created_by = ${userId} and product_quantity <= 0`)

      result.data = products.rows

    } catch (ex) {
      console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }

}

module.exports = new ProductsRepo();
