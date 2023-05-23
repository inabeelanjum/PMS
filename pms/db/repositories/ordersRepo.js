const DB = require("..");
const format = require("pg-format");

class OrdersRepo {
  constructor() {
    this.client = DB.client;
  }

  async addOrder(customer_id, charges, products, userId) {

    let result = {} 
    let productValues = []
    let productIds = []
    let availableProducts = []

    try {

      products.map((product) => {
         productIds.push(product.product_id)
      })  

      const checkProducts = await this.client.query(format(`SELECT * FROM products WHERE product_id in (%L)`, productIds))
      
      if(checkProducts.rows.length > 0) {
        checkProducts.rows.map((product) => {
            products.map((item) => {
                if(product.product_id == item.product_id && product.product_quantity >= item.quantity) {
                    availableProducts.push(product.product_id)
                }
            })
        })
      }
     
      if(productIds.sort().toString() === availableProducts.sort().toString()) {
        result.isProductsExist = true

        await this.client.query("BEGIN")

      const values = [
        customer_id,
        charges,
        userId
      ]

      const order = await this.client.query({
        text: `INSERT INTO orders(customer_id, charges, created_by)
               VALUES($1, $2, $3) RETURNING *`,
        values: values       
       })

       products.map((product) => {
        productValues.push([
            product.product_id,
            product.quantity,
            order.rows[0].order_id
        ])
       })

       const productItems = await this.client.query(format(`INSERT INTO order_items(product_id, quantity, order_id) VALUES %L RETURNING *`, productValues))

       products.map( async(product) => {
          await this.client.query(`UPDATE products
                                   SET product_quantity = product_quantity - ${product.quantity}
                                   WHERE product_id = ${product.product_id} `)
       })

      await this.client.query("COMMIT")

      } else {
        result.isProductsExist = false
      }

      
    } catch (ex) {
        console.log(ex)
      await this.client.query("ROLLBACK")
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async getOrders(userId) {

    let result = {}
    const initialValue = 0;
    let sales;

    try {

      const products = await this.client.query(`select count(*) as products from products p where p.created_by = ${userId}`)  

      const customers = await this.client.query(`select count(*) as customers from customers c where c.created_by = ${userId}`)  

      const orders = await this.client.query(`
                                                SELECT 
                                                    o.order_id,
                                                    o.created_at, 
                                                    o.charges,
                                                    c.first_name,
                                                    c.last_name,
                                                    'Success' as order_status,
                                                    json_agg(json_build_object(
                                                        'product_id', p.product_id ,
                                                        'product_name' , p.product_name,
                                                        'product_unit_price' , p.product_unit_price,
                                                        'product_quaunity' , oi.quantity
                                                        )) AS "order_items"
                                                FROM orders o 
                                                inner join customers c 
                                                    on c.customer_id  = o.customer_id 
                                                inner join order_items oi 
                                                    on oi.order_id = o.order_id  
                                                inner join products p 
                                                    on oi.product_id = p.product_id 
                                                WHERE o.created_by = ${userId}
                                                group  by o.order_id, o.charges, o.created_at, c.first_name, c.last_name`)

      if(orders.rows.length > 0) {
           sales = orders.rows.reduce(
            (accumulator, currentValue) => accumulator + parseInt(currentValue.charges),
            initialValue
        );
      }
     
      result.orders = orders.rows
      result.products = products.rows[0].products
      result.customers = customers.rows[0].customers
      result.sales = sales

    } catch (ex) {
        console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async getOrdersByCustomerId(userId, customerId) {

    let result = {} 

    try {

      const orders = await this.client.query(`
                                                SELECT 
                                                    o.order_id,
                                                    o.created_at, 
                                                    o.charges,
                                                    c.first_name,
                                                    c.last_name,
                                                    'Success' as order_status,
                                                    json_agg(json_build_object(
                                                        'product_id', p.product_id ,
                                                        'product_name' , p.product_name,
                                                        'product_unit_price' , p.product_unit_price,
                                                        'product_quaunity' , oi.quantity
                                                        )) AS "order_items"
                                                FROM orders o 
                                                inner join customers c 
                                                    on c.customer_id  = o.customer_id 
                                                inner join order_items oi 
                                                    on oi.order_id = o.order_id  
                                                inner join products p 
                                                    on oi.product_id = p.product_id 
                                                WHERE o.created_by = ${userId} and o.customer_id = ${customerId}
                                                group  by o.order_id, o.charges, o.created_at, c.first_name, c.last_name`)

      result.data = orders.rows

    } catch (ex) {
      result.hasException = true
    } finally {
      return result
    }
    
  }

}

module.exports = new OrdersRepo();
 