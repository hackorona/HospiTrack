from app import app
from app.controllers.router_scans import RouterScansController
from app.controllers.demo_router_scans import DemoRouterScansController
import time
import json

@app.route('/api/insert-router-scan')
def insert_router_scan():
    """
    inserts a new router scan from a device into the database.
    Should get the data from the request's payload from the client.
    :return: success message
    """

    # TODO: get data from client's request payload


    mock_data = {'imei': '123456789',
                 'timestamp': int(time.time()),
                 'longitude': 34.53,
                 'latitude': 54.435,
                 'altitude': 1.42,
                 'accuracy': 9.33,
                 'rssi_by_bssid': '{"krw:giwj:org": -70, "irgjw": -30, "rgj": 443}'
                 }

    new_router_scan = RouterScansController(imei=mock_data['imei'],
                                            timestamp=mock_data['timestamp'],
                                            longitude=mock_data['longitude'],
                                            latitude=mock_data['latitude'],
                                            altitude=mock_data['altitude'],
                                            accuracy=mock_data['accuracy'],
                                            rssi_by_bssid=mock_data['rssi_by_bssid']
                                            )

    new_router_scan.insert()
    return "successfuly inserted data"


@app.route('/api/insert-demo-data')
def insert_demo_data():
    """
    this was only made for inserting the demo data to the db.
    after the real data is being inserted this can be deleted.
    :return: success message
    """
    new_li = []
    columns = ['id', 'latitude', 'longitude', 'altitude', 'accuracy']
    with open(r'app/data/json_log_example.json') as f:
        dct = json.load(f)
        for key in dct:
            for el in dct[key]:
                new_row = {}
                router_jsons = {}
                new_row['timestamp'] = key
                for field in el:
                    if field in columns:
                        new_row[field] = el[field]
                    else:
                        router_jsons[field] = el[field]
                new_row['rssi_by_bssid'] = router_jsons
                new_li.append(DemoRouterScansController(
                    id=new_row['id'],
                    timestamp=new_row['timestamp'],
                    latitude=new_row['latitude'],
                    longitude=new_row['longitude'],
                    altitude=new_row['altitude'],
                    accuracy=new_row['accuracy'],
                    rssi_by_bssid=new_row['rssi_by_bssid']
                ))

    DemoRouterScansController.insert_many(new_li)
    return f'inserted {len(new_li)} records successfully'