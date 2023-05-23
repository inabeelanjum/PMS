const DB = require("..");
const { Helpers } = require("../../utils")

class CustomersRepo {
  constructor() {
    this.client = DB.client;
  }

  async addCustomer(first_mame, last_mame, email, dob, postCode, city, country, address, userId) {

    let result = {} 

    try {

      const isUserExist = await this.client.query(`SELECT * FROM customers WHERE email = '${email}'`)

      if(isUserExist.rows.length > 0) {
         result.isUserAlreadyExist = true
      } else {

         const values = [
          first_mame,
          last_mame,
          email,
          dob,
          postCode,
          city,
          country,
          address,
          userId
         ]

         const user = await this.client.query({
          text: `INSERT INTO customers(first_name, last_name, email, dob, postcode, city, country, address, created_by)
                 VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
          values: values       
         })

         result.isUserAlreadyExist = false;
         result.data = user.rows

      }

    } catch (ex) {
        console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async getCustomerByEmail(email) {

    let result = {} 

    try {

      const customer = await this.client.query(`SELECT * FROM customers WHERE email = '${email}'`)

      result.data = customer.rows

    } catch (ex) {
      console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async getCustomers() {

    let result = {} 

    try {

      const customer = await this.client.query(`SELECT * FROM customers`)

      result.data = customer.rows

    } catch (ex) {
      result.hasException = true
    } finally {
      return result
    }
    
  }
 

}

module.exports = new CustomersRepo();
