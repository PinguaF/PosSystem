import sqlite3
from datetime import datetime
from config.config_restaurant import set_pos_active_order_id

def create_order(json_order, pos_id, channel, cashier):
    with sqlite3.connect("ordersbase\orders.db") as db:
        cursor = db.cursor()
        cursor.execute(f"""SELECT MAX(`id`) FROM `main`""")
        id = cursor.fetchall()[0][0]+1
        cursor.execute(f"""SELECT MAX(`public_number`) FROM `main`""")
        public_number = cursor.fetchall()[0][0]
        if(int(public_number) == 99):
            public_number = 1
        else:
            public_number += 1
        price = 0
        state = 'new'
        time_start = datetime.now()
        sql = "INSERT INTO `main` (`id`, `public_number`, `json_order`, `price`, `pos_id`, `channel`, `state`, `time_start`, `cashier`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        val = (id, public_number, str(json_order), price, pos_id, channel, state, time_start, cashier)
        print(val)
        cursor.execute(sql, val)
        db.commit()
        set_pos_active_order_id(id, pos_id)
        return get_order(id)       

def update_order(id, json_order,  pos_id, cashier):
    with sqlite3.connect("ordersbase\orders.db") as db:
        cursor = db.cursor()
        price = 0
        sql = "UPDATE `main` SET `json_order`=?, `price`=?, `pos_id`=?, `cashier`=? WHERE `id`=?"
        val = (str(json_order), price, pos_id, cashier, id)
        cursor.execute(sql, val)
        db.commit()
        set_pos_active_order_id(id, pos_id)
        return get_order(id)       

def end_order(id, json_order,  pos_id, cashier, type, state ):
    with sqlite3.connect("ordersbase\orders.db") as db:
        cursor = db.cursor()
        price = 0
        sql = "UPDATE `main` SET `json_order`=?, `price`=?, `pos_id`=?, `cashier`=?, `type`=?, `state`=? WHERE `id`=?"
        val = (str(json_order), price, pos_id, cashier, type, state, id)
        cursor.execute(sql, val)
        db.commit()
        set_pos_active_order_id(0, pos_id)
        return get_order(id)

def get_order(id):
    try:
        with sqlite3.connect("ordersbase\orders.db") as db:
            cursor = db.cursor()
            cursor.execute(f"SELECT * FROM `main` WHERE `id`={id}")
            order = cursor.fetchall()[0]
            return order
    except:
        return False
#create_order('json', 1, 'DT', 'Casher')
#update_order(2, 'new json', 3, 'new cashier', 'НВ')
#end_order(2, 'new json', 3, 'new cashier', 'НВ')
#print(get_order(100030003))