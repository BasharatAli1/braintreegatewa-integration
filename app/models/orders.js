const initializeOrderModel = async(sequelize, DataTypes, db) => {
    try{
      const Order = await sequelize.define(
        'order',
        {
            amount: {
              type: DataTypes.INTEGER,
              defaultValue: 0
            },
            productQty: {
              type: DataTypes.INTEGER,
            },
            productName: {
              type: DataTypes.STRING,
            },
            fullName: {
              type: DataTypes.STRING,
            },
            currency: {
              type: DataTypes.STRING,
            },
            transactionInfo: {
                type: DataTypes.JSON,
            },
        },
        {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        }
      );

        return Order;
    }catch(err){
        console.error("Error while initializing order model");
        return false;
    }
}

module.exports = initializeOrderModel;