import sqlite3

def get_pos_channel(pos_id):
    with sqlite3.connect("config\config_restaurant.db") as db:
        cursor = db.cursor()
        cursor.execute(f"""SELECT `pos_channel` FROM main WHERE `pos_id`=={int(pos_id)}""")
        pos_channel = cursor.fetchall()[0][0]
        return str(pos_channel)
    
def get_pos_active_order_id(pos_id):
    with sqlite3.connect("config\config_restaurant.db") as db:
        cursor = db.cursor()
        cursor.execute(f"""SELECT `active_order_id` FROM main WHERE `pos_id`=={int(pos_id)}""")
        pos_channel = cursor.fetchall()[0][0]
        return str(pos_channel)
    
def set_pos_active_order_id(order_id, pos_id):
    with sqlite3.connect("config\config_restaurant.db") as db:
        cursor = db.cursor()
        cursor.execute("UPDATE `main` SET `active_order_id`= ? WHERE `pos_id`== ?", (int(order_id), int(pos_id)))
        cursor.fetchall()
        cursor.execute(f"""SELECT `active_order_id` FROM main WHERE `pos_id`=={int(pos_id)}""")
        pos_channel = cursor.fetchall()[0][0]
        return str(pos_channel)

def get_pos_state(pos_id):
    with sqlite3.connect("config\config_restaurant.db") as db:
        cursor = db.cursor()
        if (pos_id == "list"):
            cursor.execute(f"""SELECT `pos_state` FROM main""")
            pos_state = cursor.fetchall()
            return list(pos_state)
        else:
            cursor.execute(f"""SELECT `pos_state` FROM main WHERE `pos_id`={int(pos_id)}""")
            pos_list = cursor.fetchall()[0][0]
            return str(pos_list)

def get_pos_cashier(pos_id):
    with sqlite3.connect("config\config_restaurant.db") as db:
        cursor = db.cursor()
        cursor.execute(f"""SELECT `pos_cashier` FROM main WHERE `pos_id`={int(pos_id)}""")
        cashier = cursor.fetchall()[0][0]
        return str(cashier)

def set_pos_state(pos_id, state):
    with sqlite3.connect("config\config_restaurant.db") as db:
        cursor = db.cursor()
        cursor.execute("UPDATE `main` SET pos_state= ? WHERE pos_id== ?", (state, pos_id))
        db.commit()
        return True
    