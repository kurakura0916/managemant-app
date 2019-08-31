USE app_database;

SET CHARACTER_SET_CLIENT = utf8;
SET CHARACTER_SET_CONNECTION = utf8;

INSERT INTO account_users (email, password) VALUES  ('hoge@domain.com', 'password');

INSERT INTO reservations (status, name, store_id, store_name, num, visit_time) VALUES ('確定', '山田 太郎', 1, '店舗A', 2, '2019-08-20 13:00:00');
INSERT INTO reservations (status, name, store_id, store_name, num, visit_time) VALUES ('キャンセル', '山田 花子', 2, '店舗B', 3, '2019-08-23 13:00:00');
INSERT INTO reservations (status, name, store_id, store_name, num, visit_time) VALUES ('確定', '佐藤 太郎', 3, '店舗C', 5, '2019-08-25 14:00:00' );
INSERT INTO reservations (status, name, store_id, store_name, num, visit_time) VALUES ('確定', '田中 太郎', 3, '店舗A', 5, '2019-08-28 14:00:00' );

INSERT INTO stores (store_id, store_name) select store_id, store_name from reservations where store_name = '店舗A';
INSERT INTO stores (store_id, store_name) select store_id, store_name from reservations where store_name = '店舗B';
INSERT INTO stores (store_id, store_name) select store_id, store_name from reservations where store_name = '店舗C';
