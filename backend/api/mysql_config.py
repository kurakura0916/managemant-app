import mysql.connector


class MysqlConnector:

    def __init__(self, **dns):
        self.dns = dns
        self.connector = None

    def _open(self):
        self.connector = mysql.connector.connect(**self.dns)

    def _close(self):
        self.connector.close()

    def execute(self, query):
        prefix = query.split(' ')[0]
        self._open()

        cursor = self.connector.cursor()
        cursor.execute(query)
        if prefix == 'select':
            data = cursor.fetchall()
            self._close()
            return data
        elif prefix == 'insert' or prefix == 'update':
            self.connector.commit()
            self._close()
