if __name__ == '__main__':
    from flask import jsonify

    data = [(1, 'A', 'hoge'), (2, 'B', 'fuga')]

    response_data = {}
    response_data['body'] = data
    print(response_data)

    print(jsonify(data))

