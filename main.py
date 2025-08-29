from flask import Flask, render_template, make_response
from flask_socketio import SocketIO, emit
from database.database import select_all_products
from config.config_restaurant import get_pos_channel, get_pos_state, get_pos_cashier, set_pos_state, get_pos_active_order_id
from ordersbase.orderenviroment import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

@app.route('/cashier/<int:pos_id>')
def cashier(pos_id):
    try:
        return render_template('cashier.html', pos_id=str(pos_id), 
                            pos_channel=get_pos_channel(pos_id),
                            pos_state=get_pos_state(pos_id),
                            pos_cashier=get_pos_cashier(pos_id))
    except:
        return "Not allowed id of POS"


@app.route('/kvs')
def kvs():
    return render_template('kvs-template.html')


@app.route('/cashier/monitor/<int:pos_id>')
def pos_monitor(pos_id):
    try:
        return render_template('pos-monitor.html', pos_id=str(pos_id), 
                               pos_state=get_pos_state(pos_id), 
                               pos_cashier=get_pos_cashier(pos_id))
    except:
        return "Not allowed id of POS"


@app.route('/wayweb')
def wayweb():
    return render_template('wayweb.html', pos_state=get_pos_state("list"))

#AUTH MANAGER!
@app.route('/mnglogin', methods=['POST'])
def mnglogin():
    response = make_response("MNG_Auth", 200)
    response.mimetype = "text/plain"
    return response

#SOCKET
@socketio.on('connect')
def handle_connect():
    product_list = select_all_products()
    emit('active_product_list', {'list': product_list}, broadcast=True)

@socketio.on('get_active_order_id')
def send_active_order_id(data):
    active_id = get_pos_active_order_id(data['pos_id'])
    emit('active_order_id', {'active_order_id': active_id}, broadcast=False)
    #print('Client connected!')


#ORDERS ENV
@socketio.on('create_order')
def socket_create_order(data):
    answ = create_order(data['json_order'], data['pos_id'], data['channel'], data['cashier'])
    #emit('answer_create_order', {'answ': answ}, broadcast=False)
    emit('answer_get_order', {'answ': answ}, broadcast=True)
    active_id = get_pos_active_order_id(data['pos_id'])
    emit('active_order_id', {'active_order_id': active_id}, broadcast=False)

@socketio.on('update_order')
def socket_update_order(data):
    answ =update_order(data['id'], data['json_order'], data['pos_id'], data['cashier'])
    #emit('answer_update_order', {'answ': answ}, broadcast=False)
    emit('answer_get_order', {'answ': answ}, broadcast=True)
    active_id = get_pos_active_order_id(data['pos_id'])
    emit('active_order_id', {'active_order_id': active_id}, broadcast=False)

@socketio.on('end_order')
def socket_end_order(data):
    answ = end_order(data['id'], data['json_order'], data['pos_id'], data['cashier'], data['type'], data['state'])
    #emit('answer_end_order', {'answ': answ}, broadcast=False)
    emit('answer_get_order', {'answ': answ}, broadcast=True)
    active_id = get_pos_active_order_id(data['pos_id'])
    emit('active_order_id', {'active_order_id': active_id}, broadcast=False)

@socketio.on('get_order')
def socket_get_order(data):
    answ = get_order(data['id'])
    emit('answer_get_order', {'answ': answ}, broadcast=True)
    #active_id = get_pos_active_order_id(data['pos_id'])
    #emit('active_order_id', {'active_order_id': active_id}, broadcast=False)




@socketio.on('command_reload_all_pos')
def reaload_all_pos():
    print(f'Reloading all POS...')
    emit('reload_all_pos', {'message': 'Server received your message!'}, broadcast=True)

@socketio.on('reload_pos')
def reload_pos(data):
    print(f'Reloading POS {data['pos_id']}...')
    emit('reload_pos', {'pos': data['pos_id']}, broadcast=True)

@socketio.on('change_pos_block_state')
def reload_pos(data):
    print(f'Change state {data['state']} to POS {data['pos_id']}...')
    set_pos_state(data['pos_id'], data['state'])
    emit('reload_pos', {'pos': data['pos_id']}, broadcast=True)
    

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')