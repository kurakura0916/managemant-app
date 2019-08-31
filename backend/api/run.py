from flask import Flask, jsonify, request, make_response, abort
from flask_cors import CORS
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from mysql_config import MysqlConnector
import datetime

dns = {
    'user': 'root',
    'host': 'mydb',
    'password': 'password',
    'database': 'app_database',
    'port': 3306
}

db = MysqlConnector(**dns)

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app)


@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello World'})


@app.route('/reservations', methods=['GET'])
def get_reservations():
    response_data = []
    headers = ['id', 'status', 'name', 'store_id', 'store_name', 'num', 'visit_timestamp', 'visit_date', 'start_time', 'end_time']
    query = 'select id, status, name, store_id, store_name, num, visit_time from reservations where delete_flag = 0;'

    # [(1, '確定', '山田 太郎', '店舗A', 2, datetime.datetime(2019, 10, 1, 0, 0)), (2,..)]
    data = db.execute(query)

    for item in data:
        item = list(item)
        date = item[6].strftime('%Y-%m-%d')
        start_time = item[6].strftime('%H:%M:%S')
        dt_end_time = item[6] + datetime.timedelta(hours=1)
        end_time = dt_end_time.strftime('%H:%M:%S')
        item += [date, start_time, end_time]
        dict_item = dict(zip(headers, item))
        response_data.append(dict_item)

    return make_response(jsonify(response_data), 200)


@app.route('/reservations/value/time', methods=['POST'])
def get_reservation_data():
    """
    curl localhost:5000/reservations/value/time -X POST -H "Content-Type: application/json" -d '{"start": "2019-08-01", "end": "2019-08-31"}'
    :return:
    """
    start_date = request.json['start']
    end_date = request.json['end']

    if start_date and end_date:
        query = 'select store_name, created_at, sum(num) from reservations where created_at between "{0}" and "{1}" group by store_name, created_at'.format(
            start_date, end_date
        )
        data = db.execute(query)
        response_data = []
        headers = ['store_name', 'date_time', 'value']
        for item in data:
            item = list(item)
            item[2] = int(item[2])
            dict_item = dict(zip(headers, item))
            response_data.append(dict_item)

        return make_response(jsonify(response_data), 200)
    else:
        abort(404)


@app.route('/auth/login', methods=['POST'])
def login():
    email = request.json['email']
    input_password = request.json['password']

    if email and input_password:

        query = 'select password from account_users where email="{0}";'.format(email)
        password = db.execute(query)
        if not check_password_hash(password[0][0], input_password):
            return abort(401)

        encoded = jwt.encode({'name': password[0]}, 'SECRET_KEY', algorithm='HS256')
        return make_response(jsonify({'email': email, 'token': encoded.decode('utf-8')}), 200)
    else:
        abort(404)


@app.route('/auth/signup', methods=['POST'])
def signup():
    email = request.json['email']
    password = request.json['password']

    if email and password:
        query = 'select email from account_users where email="{0}"'.format(email)
        data = db.execute(query)
        if not data:
            hash_password = generate_password_hash(password)
            query = 'insert into account_users (email, password) values  ("{0}", "{1}");'.format(email, hash_password)
            db.execute(query)
            return make_response(jsonify({'message': 'completed registration'}), 200)
        else:
            abort(401)
    else:
        abort(404)


@app.route('/reservations/update', methods=['POST'])
def update():
    data = request.json

    if data:
        query = 'update reservations set name="{name}"where id={id};'\
            .format(name=data['name'], id=data['id'])
        db.execute(query)
        return make_response(jsonify({'message': 'completed update'}), 200)

    else:
        abort(404)


@app.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def delete(reservation_id):
    if reservation_id:
        query = 'update reservations set delete_flag=1 where id={id};'.format(id=reservation_id)
        db.execute(query)
        return make_response(jsonify({'message': 'delete successfully'}), 200)
    else:
        abort(404)


@app.errorhandler(401)
@app.errorhandler(404)
def error_handler(error):
    response = jsonify({'message': error.name, 'status': error.code})
    return response, error.code


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
