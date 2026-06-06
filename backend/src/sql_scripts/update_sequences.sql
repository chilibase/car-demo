SELECT setval('car_demo.x_enum_type_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.x_enum_type), 1), false);
SELECT setval('car_demo.x_enum_value_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.x_enum_value), 1), false);
SELECT setval('car_demo.x_parameter_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.x_parameter), 1), false);
SELECT setval('car_demo.x_file_meta_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.x_file_meta), 1), false);

-- xs tables
SELECT setval('car_demo.xs_interval_set_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_interval_set), 1), false);
SELECT setval('car_demo.xs_interval_item_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_interval_item), 1), false);
SELECT setval('car_demo.xs_group_by_field_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_group_by_field), 1), false);
SELECT setval('car_demo.xs_group_by_field_by_entity_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_group_by_field_by_entity), 1), false);
SELECT setval('car_demo.xs_stat_field_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_stat_field), 1), false);
SELECT setval('car_demo.xs_table_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_table), 1), false);
SELECT setval('car_demo.xs_table_subtable_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_table_subtable), 1), false);
SELECT setval('car_demo.xs_table_group_by_field_for_columns_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_table_group_by_field_for_columns), 1), false);
SELECT setval('car_demo.xs_table_group_by_field_for_rows_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xs_table_group_by_field_for_rows), 1), false);

-- xr tables
SELECT setval('car_demo.xr_report_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xr_report), 1), false);
SELECT setval('car_demo.xr_report_column_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xr_report_column), 1), false);
SELECT setval('car_demo.xr_report_where_item_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xr_report_where_item), 1), false);
SELECT setval('car_demo.xr_report_sort_field_id_seq', COALESCE((SELECT MAX(id)+1 FROM car_demo.xr_report_sort_field), 1), false);
