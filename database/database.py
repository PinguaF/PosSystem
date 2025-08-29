import sqlite3

def select_all_products():
    with sqlite3.connect("database\products.db") as db:
        cursor = db.cursor()
        cursor.execute(f"""SELECT * FROM main""")
        product_list = cursor.fetchall()
        return product_list
