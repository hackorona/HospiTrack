from app import app
from app.controllers.router_scans import RouterScansController
from app.controllers.labeled_router_scans import LabeledRouterScansController
from app.controllers.demo_router_scans import DemoRouterScansController
import json
from flask import request, jsonify


@app.route('/api/test')
def test():
    return jsonify(success=True)


@app.route('/api/insert-router-scan', methods=['POST', 'GET'])
def insert_router_scan():
    """
    inserts a new router scan from a device into the database.
    gets the data from the request's payload from the client.
    :return: http response
    """
    data = request.json

    data['room_id'] = data['roomId'] if 'roomId' in data else data['room_id']
    # TODO: shouldn't recieve roomId - delete the line above

    if data['room_id']:
        # if the data has a room_id -> insert it into the labeled table (for model training)
        new_labeled_router_scan = LabeledRouterScansController(imei=data['imei'],
                                                    timestamp=data['timestamp'],
                                                    longitude=data['longitude'],
                                                    latitude=data['latitude'],
                                                    altitude=data['altitude'],
                                                    accuracy=data['accuracy'],
                                                    room_id=data['room_id'],
                                                    rssi_by_bssid=data['rssi_by_bssid'])
        new_labeled_router_scan.insert()

    else:
        # if the data has a null room_id -> insert it into the unlabeled table (for predictions)
        new_router_scan = RouterScansController(imei=data['imei'],
                                                timestamp=data['timestamp'],
                                                longitude=data['longitude'],
                                                latitude=data['latitude'],
                                                altitude=data['altitude'],
                                                accuracy=data['accuracy'],
                                                rssi_by_bssid=data['rssi_by_bssid']
                                                )
        new_router_scan.insert()

    resp = jsonify(success=True)
    resp.status_code = 200
    return resp


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