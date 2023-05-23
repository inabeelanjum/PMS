const DB = require("..");
const { Helpers } = require("../../utils")

class UsersRepo {
  constructor() {
    this.client = DB.client;
  }

  async register(first_mame, last_mame, email, password, role_id, city, address) {

    let result = {} 

    try {

      const isUserExist = await this.client.query(`SELECT * FROM users WHERE email = '${email}'`)

      if(isUserExist.rows.length > 0) {
         result.isUserAlreadyExist = true
      } else {

         const values = [
          first_mame,
          last_mame,
          Helpers.encryptPassword(password),
          role_id,
          email,
          new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
          city,
          address
         ]

         const user = await this.client.query({
          text: `INSERT INTO users(first_name, last_name, password, role_id, email, created_date, city, address)
                 VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
          values: values       
         })

         result.isUserAlreadyExist = false;
         result.data = user.rows

      }

    } catch (ex) {
      result.hasException = true
    } finally {
      return result
    }
    
  }

  async login(email, password) {

    let result = {} 

    try {

      const isUserExist = await this.client.query(`SELECT * FROM users WHERE email = '${email}'`)

      if(isUserExist.rows.length > 0) {

        result.isUserExist = true

        const passwordIsCorrect = Helpers.comparePasswordWithHash(
          password,
          isUserExist.rows[0].password
        );

        if(!passwordIsCorrect) {
          result.isPasswordCorrect = false
        } else {

          result.isPasswordCorrect = true
          
          let userInfo = {
            user_id: isUserExist.rows[0].user_id,
            user_name: `${isUserExist.rows[0].first_name}.${isUserExist.rows[0].last_name}`,
            role_id: isUserExist.rows[0].role_id,
            token: Helpers.getSignedJwtToken(isUserExist.rows[0].user_id)
          }

          result.data = userInfo

        }

      } else {
        result.isUserExist = false
      }

    } catch (ex) {
      console.log(ex)
      result.hasException = true
    } finally {
      return result
    }
    
  }


}

module.exports = new UsersRepo();
