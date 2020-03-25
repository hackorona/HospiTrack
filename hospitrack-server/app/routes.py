from app import app
from app.controllers.router_scans import RouterScansController
import time
import json

@app.route('/api/insert-router-scan')
def insert_router_scan():
    """
    inserts a new router scan from a device into the database.
    Should get the data from the request's payload from the client.
    :return:
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
    with open(r'app/data/json_log_example.json') as f:
        dct = json.load(f)
        print(dct)
    return ''